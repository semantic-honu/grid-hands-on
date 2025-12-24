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
const GenericGrid = ({ rows, columns, error, loading, setRows, ...rest }) => {
  const [deleteMode, setDeleteMode] = useState(false); //削除モードの状態

  return (
    <>
      {error && !loading && (
        <div style={{ color: "blue" }}> {error?.message}</div>
      )}
      <div
        style={{
          height: "calc(100vh - 120px)",
          width: `calc(100vw - 60px)`,
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
        <DataGrid
          rows={rows || []} // rowsが未定義の場合のエラーを防ぐ
          columns={columns}
          loading={loading}
          editMode="row"
          error={error} // error は DataGrid 自身も使うので渡す
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
            "& .MuiDataGrid-columnHeaders": {
              "--DataGrid-t-header-background-base": "#f0f0f0",
              height: "50px",
              color: "var(--modern-black)",
            },
          }}
          {...rest} // App.jsxから渡された onRowClick などがここに展開される
        />
      </div>
    </>
  );
};

export default GenericGrid;
