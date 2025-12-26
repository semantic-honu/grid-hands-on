import { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";
import { createBookApi, deleteBookApi, updateBookApi } from "../api/bookApi";
import GenericGrid from "../components/GenericGrid";
import { bookColumnsSchema } from "../constants/bookSchema";
import { handlePromiseAll } from "../utils/promiseUtils";
import useLoadBooks from "../hooks/useLoadBooks";
import { createOrUpdateBooks } from "../utils/bookUtils";

const BookPage = () => {
  const [rowErrors, setRowErrors] = useState({}); // { [rowId]: { [field]: 'message' } }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  const [selectedIds, setSelectedIds] = useState([]); //選択されたチェックボックスの値
  const { loadBooks } = useLoadBooks({
    setLoading,
    setBooks,
    setRowErrors,
    setError,
  }); // カスタムフックの呼び出し

  const columns = bookColumnsSchema.map((col) => ({
    ...col,
    renderCell: (params) => {
      const errorMsg = rowErrors[params.id]?.[params.field];
      let displayValue = params.value ?? "";
      if (col.type === "date" && displayValue) {
        displayValue = new Date(displayValue).toLocaleDateString("ja-JP");
      }
      return (
        <Tooltip title={errorMsg || ""} arrow disableHoverListener={!errorMsg}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <span
              style={{
                backgroundColor: errorMsg ? "#ffebee" : "transparent", // 薄い赤
                color: errorMsg ? "#d32f2f" : "inherit", // 濃い赤
                padding: errorMsg ? "2px 8px" : "0", // エラーの時だけ少し内側を塗る
                borderRadius: "4px", // 角を少し丸くする
                fontSize: "0.875rem",
              }}
            >
              {displayValue}
            </span>
          </div>
        </Tooltip>
      );
    },
  }));

  // 初回ロード
  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  //エラー表示
  useEffect(() => {
    if (error !== null) {
      console.log("Error occured:", error);
    }
  }, [error]);

  //新規登録＆更新
  const useSaveData = async () => {
    document.activeElement?.blur(); // 編集中セルのフォーカスを外す

    const UpdateRows = books.filter((b) => b.isUpdate);
    removeRowError(UpdateRows);
    try {
      await createOrUpdateBooks(
        setError,
        setLoading,
        UpdateRows,
        updateBookApi,
        setRowErrors,
        books,
        setBooks
      );
    } catch (error) {
      setError(error);
    }

    const newRows = books.filter((b) => b.isNew);
    removeRowError(newRows);
    try {
      await createOrUpdateBooks(
        setError,
        setLoading,
        newRows,
        createBookApi,
        setRowErrors,
        books,
        setBooks
      );
    } catch (error) {
      setError(error);
    }

    function removeRowError(row) {
      const RowIds = row.map((r) => r.id);
      setRowErrors((currentErrors) => {
        const remainingErrors = { ...currentErrors };
        RowIds.forEach((id) => delete remainingErrors[id]);
        return remainingErrors;
      });
    }
  };

  // 削除
  const useDeleteData = async () => {
    try {
      // selectedIdsに一致するbookオブジェクトの配列を作成
      const 配列化されたIDs = Array.from(selectedIds?.ids);
      const rowsToDelete = books.filter((book) =>
        配列化されたIDs.includes(book.id)
      );
      const { successfulResults } = await handlePromiseAll({
        setError,
        setLoading,
        rows: rowsToDelete, // オブジェクトの配列を渡すように修正
        crudFunction: deleteBookApi,
      });

      //成功した行を削除
      if (successfulResults.length > 0) {
        const successfulIds = new Set(
          successfulResults.map(({ row }) => row.id)
        );
        setBooks((prevBooks) =>
          prevBooks.filter((b) => !successfulIds.has(b.id))
        );
        setSelectedIds([]);
      }
    } catch (error) {
      setError(error);
    }
  };

  const gridProps = {
    rows: books,
    columns,
    error,
    loading,
    setRows: setBooks,
    useSaveData,
    useDeleteData,
    setSelectedIds,
  };

  return <GenericGrid {...gridProps} />;
};

export default BookPage;
