import { DataGrid, GridRowModes } from "@mui/x-data-grid";
import StackButton from "./StackButton";
import { useState, useCallback, useEffect } from "react";
import { 
  useMediaQuery, 
  useTheme, 
} from "@mui/material";
import { useBeforeUnload } from "react-router-dom";
import { useGridStore } from "../stores/useGridStore";

// エラー表示用のコンポーネントを内部で定義
function CustomErrorOverlay({ error }) {
  return (
    <div style={{ padding: 20, color: "red", fontWeight: "bold" }}>
      ⚠️ 通信エラー: {error?.message || "不明なエラー"}
    </div>
  );
}

// DataGrid に渡したい props を `...rest` でまとめて受け取る
const GenericGrid = ({
  rows,
  columns,
  error,
  loading,
  setRows,
  setRowErrors,
  gridHeight = "calc(100vh - 120px)",
  gridWidth = "calc(100vw - 60px)",
  ...rest
}) => {
  const [deleteMode, setDeleteMode] = useState(false); //削除モードの状態
  const [rowModesModel, setRowModesModel] = useState({}); // 編集モードの状態管理
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // スマホ判定

  const setGlobalHasUnsavedChanges = useGridStore((state) => state.setHasUnsavedChanges);

  // 未保存のデータがあるか判定
  const hasUnsavedChanges = rows.some(r => r.isNew || r.isUpdate);

  // ストアの状態を同期
  useEffect(() => {
    setGlobalHasUnsavedChanges(hasUnsavedChanges);
    
    // アンマウント時にリセット
    return () => {
      setGlobalHasUnsavedChanges(false);
    };
  }, [hasUnsavedChanges, setGlobalHasUnsavedChanges]);

  // 1. ブラウザのタブ閉じ・リロードを防止
  useBeforeUnload(
    useCallback(
      (event) => {
        if (hasUnsavedChanges) {
          event.preventDefault();
        }
      },
      [hasUnsavedChanges]
    )
  );

  // 行クリック時の処理
  const handleRowClick = (params) => {
    // スマホかつ削除モードでない場合、シングルクリックで編集モードへ
    if (isMobile && !deleteMode) {
      setRowModesModel({
        ...rowModesModel,
        [params.id]: { mode: GridRowModes.Edit },
      });
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleCellEditStart = (params) => {
    if (setRowErrors) {
      setRowErrors((prev) => {
        const rowError = prev[params.id];
        if (rowError && rowError[params.field]) {
          const newRowError = { ...rowError };
          delete newRowError[params.field];
          
          // もしその行のエラーが他になければ、行ごと削除
          if (Object.keys(newRowError).length === 0) {
            const next = { ...prev };
            delete next[params.id];
            return next;
          }
          
          return {
            ...prev,
            [params.id]: newRowError,
          };
        }
        return prev;
      });
    }
  };

  return (
    <>
      {error && !loading && (
        <div style={{ color: "blue" }}> {error?.message}</div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: gridHeight,
          width: gridWidth,
        }}
      >
        <StackButton
          rows={rows}
          setRows={setRows}
          error={error}
          useSaveData={rest?.useSaveData}
          useDeleteData={rest?.useDeleteData}
          deleteMode={deleteMode}
          setDeleteMode={setDeleteMode}
        />
        <div style={{ flex: 1, width: "100%" }}>
          <DataGrid
            rows={rows || []} // rowsが未定義の場合のエラーを防ぐ
            columns={columns}
            loading={loading}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowClick={handleRowClick}
            onCellEditStart={handleCellEditStart}
            error={error} // error は DataGrid 自身も使うので渡す
            columnHeaderHeight={50} // ヘッダーの高さをプロパティで指定
            // 削除時のチェックボックス処理
            checkboxSelection={deleteMode}
            onRowSelectionModelChange={(ids) => {
              rest?.setSelectedIds(ids);
            }}
            //行更新時の処理
            processRowUpdate={(newRow, oldRow) => {
              // 変更があったフィールドを抽出
              const changedFields = Object.keys(newRow).filter(key => 
                key !== 'isUpdate' && key !== 'isNew' && newRow[key] !== oldRow[key]
              );

              if (changedFields.length > 0) {
                // 1. 変更があったフィールドのエラーを状態から削除
                if (setRowErrors) {
                  setRowErrors((prev) => {
                    const rowError = prev[newRow.id];
                    if (!rowError) return prev;
                    
                    const newRowError = { ...rowError };
                    let hasErrorToRemove = false;
                    
                    changedFields.forEach(field => {
                      if (newRowError[field]) {
                        delete newRowError[field];
                        hasErrorToRemove = true;
                      }
                    });

                    if (!hasErrorToRemove) return prev;

                    const next = { ...prev };
                    if (Object.keys(newRowError).length === 0) {
                      delete next[newRow.id];
                    } else {
                      next[newRow.id] = newRowError;
                    }
                    return next;
                  });
                }

                // 2. 既存行かつ実際に変更があった場合のみ更新フラグを立てる
                if (!oldRow.isNew) {
                  newRow.isUpdate = true;
                }
                // 3. ステートに反映
                setRows((prev) =>
                  prev.map((r) => (r.id === oldRow.id ? newRow : r))
                );
                return newRow;
              }

              // 変更がない場合は元の行をそのまま返す
              return oldRow;
            }}
            getRowClassName={(params) => {
              return params.row.isNew || params.row.isUpdate ? 'row-unsaved' : '';
            }}
            components={{
              ErrorOverlay: () => <CustomErrorOverlay error={error} />,
            }}
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{
              // 未保存の行に左端のインジケーターを表示
              "& .row-unsaved": {
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "10%",
                  height: "80%",
                  width: "4px",
                  backgroundColor: (theme) => theme.palette.primary.main,
                  borderRadius: "0 4px 4px 0",
                  zIndex: 1,
                },
              },
              // ヘッダー全体の背景色
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: (theme) => theme.palette.mode === 'light' ? "#f0f0f0 !important" : "#111111 !important",
              },
              // 各ヘッダーセルの背景色
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: (theme) => theme.palette.mode === 'light' ? "#f0f0f0 !important" : "#111111 !important",
                color: (theme) => theme.palette.mode === 'light' ? "var(--modern-black)" : "#e0e0e0",
              },
              // データセルのテキストにだけ余白を付ける（レイアウトを崩さない安全な方法）
              "& .MuiDataGrid-cell": {
                paddingLeft: "16px !important",
                paddingRight: "16px !important",
              },
              // 編集中のセルは入力欄が広がるように余白を消す
              "& .MuiDataGrid-cell--editing": {
                padding: "0 !important",
              },
              // ヘッダーのテキストにだけ余白を付ける
              "& .MuiDataGrid-columnHeaderTitleContainer": {
                paddingLeft: "8px !important",
                paddingRight: "8px !important",
              },
              // チェックボックス列の余白を強制解除（ズレ防止の要）
              "& .MuiDataGrid-columnHeader--checkbox, & .MuiDataGrid-cell--checkbox": {
                padding: "0 !important",
                width: "50px !important",
                minWidth: "50px !important",
              },
            }}
            {...rest} // App.jsxから渡された onRowClick などがここに展開される
          />
        </div>
      </div>
    </>
  );
};

export default GenericGrid;
