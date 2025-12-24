import { Stack } from "@mui/material";
import { bookNewRowSchema } from "../constants/bookSchema";
import TextButton from "./TextButton";

const StackButton = ({
  rows,
  setRows,
  error,
  useSaveData,
  useDeleteData,
  deleteMode,
  setDeleteMode,
}) => {
  const addRow = () => {
    const newRow = { ...bookNewRowSchema, id: `new-${Date.now()}` };
    setRows([newRow, ...rows]);
  };

  const hasError = Boolean(error);

  // 削除モードのときだけ前半を disable
  const disableAddAndSave = hasError || deleteMode;

  // 削除ボタンはエラーのときだけ disable
  const disableDelete = hasError;

  return (
    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
      <TextButton
        text="行を追加する"
        onClick={addRow}
        disabled={disableAddAndSave}
      />
      <TextButton
        text="データを保存する"
        onClick={useSaveData}
        disabled={disableAddAndSave}
      />
      {!deleteMode && (
        <TextButton
          text="データを削除する"
          onClick={() => setDeleteMode(true)}
          disabled={disableDelete}
        />
      )}

      {deleteMode && (
        <>
          <TextButton
            text="削除を実行する"
            onClick={useDeleteData}
            disabled={disableDelete}
          />
          <TextButton
            text="キャンセル"
            onClick={() => setDeleteMode(false)}
            disabled={disableDelete}
          />
        </>
      )}
    </Stack>
  );
};

export default StackButton;
