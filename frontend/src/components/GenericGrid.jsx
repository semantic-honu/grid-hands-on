import { DataGrid } from "@mui/x-data-grid";
import StackButton from "./StackButton";
import { useState } from "react";

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
  gridHeight = "calc(100vh - 120px)",
  gridWidth = "calc(100vw - 60px)",
  ...rest
}) => {
  const [deleteMode, setDeleteMode] = useState(false); //削除モードの状態

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
            error={error} // error は DataGrid 自身も使うので渡す
            columnHeaderHeight={50} // ヘッダーの高さをプロパティで指定
            // 削除時のチェックボックス処理
            checkboxSelection={deleteMode}
            onRowSelectionModelChange={(ids) => {
              rest?.setSelectedIds(ids);
            }}
            //行更新時の処理
            processRowUpdate={(newRow, oldRow) => {
              // 1. 既存行なら更新フラグを立てる
              if (!oldRow.isNew) {
                newRow.isUpdate = true;
              }

              // 2. ステートに反映
              setRows((prev) =>
                prev.map((r) => (r.id === oldRow.id ? newRow : r))
              );

              return newRow;
            }}
            components={{
              ErrorOverlay: () => <CustomErrorOverlay error={error} />,
            }}
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{
              // ヘッダー全体の背景色
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f0f0f0 !important",
              },
              // 各ヘッダーセルの背景色（これがないと白くなる場合がある）
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#f0f0f0 !important",
                color: "var(--modern-black)",
              },
              // データセルのテキストにだけ余白を付ける（レイアウトを崩さない安全な方法）
              "& .MuiDataGrid-cell": {
                paddingLeft: "16px !important",
                paddingRight: "16px !important",
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
