import { useState, useEffect, useMemo } from "react";
import GenericGrid from "./GenericGrid";
import { reviewColumnsSchema } from "../constants/reviewSchema";
import { createGridColumns } from "../utils/gridUtils";
import useLoadReviews from "../hooks/useLoadReviews";
import {
  createReviewApi,
  deleteReviewApi,
  updateReviewApi,
} from "../api/reviewApi";
import { handlePromiseAll } from "../utils/promiseUtils";
import { createOrUpdateReviews } from "../utils/reviewUtils";

export const ReviewListSection = ({ bookId }) => {
  const [rowErrors, setRowErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const { loadReviews } = useLoadReviews({
    setLoading,
    setReviews,
    setRowErrors,
    setError,
    bookId,
  });

  const columns = useMemo(
    () => createGridColumns(reviewColumnsSchema, rowErrors),
    [rowErrors]
  );

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  useEffect(() => {
    if (error !== null) {
      console.log("Error occured:", error);
    }
  }, [error]);

  const useSaveData = async () => {
    document.activeElement?.blur();

    // 更新行の抽出
    const updateRows = reviews.filter((r) => r.isUpdate && !r.isNew);
    removeRowError(updateRows);
    try {
      if (updateRows.length > 0) {
        await createOrUpdateReviews(
          setError,
          setLoading,
          updateRows,
          updateReviewApi,
          setRowErrors,
          reviews,
          setReviews
        );
      }
    } catch (error) {
      setError(error);
    }

    // 新規行の抽出
    const newRows = reviews.filter((r) => r.isNew);
    removeRowError(newRows);
    try {
      if (newRows.length > 0) {
        // createReviewApiには直接渡せないbookIdを渡しつつ、displayNameも引き継ぐ
        const createFn = (row) => createReviewApi(bookId, row);
        createFn.displayName = createReviewApi.displayName;

        await createOrUpdateReviews(
          setError,
          setLoading,
          newRows,
          createFn,
          setRowErrors,
          reviews,
          setReviews
        );
      }
    } catch (error) {
      setError(error);
    }

    function removeRowError(rows) {
      const rowIds = rows.map((r) => r.id);
      setRowErrors((currentErrors) => {
        const remainingErrors = { ...currentErrors };
        rowIds.forEach((id) => delete remainingErrors[id]);
        return remainingErrors;
      });
    }
  };

  const useDeleteData = async () => {
    try {
      // どのような形式（Array, Set, {ids: [...]}) で来ても確実に配列に変換する
      let rawIds = Array.isArray(selectedIds) 
        ? selectedIds 
        : (selectedIds?.ids || selectedIds);
      
      const idsArray = Array.from(rawIds || []);

      if (idsArray.length === 0) return;

      const rowsToDelete = reviews.filter((review) =>
        idsArray.includes(review.id)
      );

      // 1. 未保存の新規行 (isNew: true) を即座にローカルから消す
      const newRowsToDelete = rowsToDelete.filter((r) => r.isNew);
      const newRowIds = new Set(newRowsToDelete.map((r) => r.id));

      if (newRowIds.size > 0) {
        setReviews((prev) => prev.filter((r) => !newRowIds.has(r.id)));
      }

      // 2. 保存済みの行のみ API で削除を実行
      const savedRowsToDelete = rowsToDelete.filter((r) => !r.isNew);

      if (savedRowsToDelete.length > 0) {
        const { successfulResults } = await handlePromiseAll({
          setError,
          setLoading,
          rows: savedRowsToDelete,
          crudFunction: deleteReviewApi,
        });

        if (successfulResults.length > 0) {
          const successfulIds = new Set(
            successfulResults.map(({ row }) => row.id)
          );
          setReviews((prevReviews) =>
            prevReviews.filter((r) => !successfulIds.has(r.id))
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
    rows: reviews,
    columns,
    error,
    loading,
    setRows: setReviews,
    useSaveData,
    useDeleteData,
    setSelectedIds,
    gridHeight: "400px",
    gridWidth: "100%",
  };

  return <GenericGrid {...gridProps} />;
};
