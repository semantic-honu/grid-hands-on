import { useState, useEffect, useMemo } from "react";
import { createBookApi, deleteBookApi, updateBookApi } from "../api/bookApi";
import GenericGrid from "../components/GenericGrid";
import { bookColumnsSchema } from "../constants/bookSchema";
import { handlePromiseAll } from "../utils/promiseUtils";
import useLoadBooks from "../hooks/useLoadBooks";
import { createOrUpdateBooks } from "../utils/bookUtils";
import { createGridColumns } from "../utils/gridUtils";

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

  const columns = useMemo(
    () => createGridColumns(bookColumnsSchema, rowErrors),
    [rowErrors]
  );

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
    if (UpdateRows.length > 0) {
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
    }

    const newRows = books.filter((b) => b.isNew);
    if (newRows.length > 0) {
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
      // どのような形式（Array, Set, {ids: [...]}) で来ても確実に配列に変換する
      let rawIds = Array.isArray(selectedIds) 
        ? selectedIds 
        : (selectedIds?.ids || selectedIds);
      
      const idsArray = Array.from(rawIds || []);

      if (idsArray.length === 0) return;

      const rowsToDelete = books.filter((book) =>
        idsArray.includes(book.id)
      );

      // 1. 未保存の新規行 (isNew: true) を即座にローカルから消す
      const newRowsToDelete = rowsToDelete.filter((r) => r.isNew);
      const newRowIds = new Set(newRowsToDelete.map((r) => r.id));

      if (newRowIds.size > 0) {
        setBooks((prev) => prev.filter((b) => !newRowIds.has(b.id)));
      }

      // 2. 保存済みの行のみ API で削除を実行
      const savedRowsToDelete = rowsToDelete.filter((r) => !r.isNew);

      if (savedRowsToDelete.length > 0) {
        const { successfulResults } = await handlePromiseAll({
          setError,
          setLoading,
          rows: savedRowsToDelete,
          crudFunction: deleteBookApi,
        });

        // 成功した行を削除
        if (successfulResults.length > 0) {
          const successfulIds = new Set(
            successfulResults.map(({ row }) => row.id)
          );
          setBooks((prevBooks) =>
            prevBooks.filter((b) => !successfulIds.has(b.id))
          );
        }
      }
      
      // 選択をクリア
      setSelectedIds([]);
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
