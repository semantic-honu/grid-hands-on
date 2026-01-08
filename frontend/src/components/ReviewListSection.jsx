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

    const updateRows = reviews.filter((r) => r.isUpdate);
    removeRowError(updateRows);
    try {
      await createOrUpdateReviews(
        setError,
        setLoading,
        updateRows,
        updateReviewApi,
        setRowErrors,
        reviews,
        setReviews
      );
    } catch (error) {
      setError(error);
    }

    const newRows = reviews.filter((r) => r.isNew);
    removeRowError(newRows);
    try {
      // createReviewApiには直接渡せないbookIdを渡しつつ、displayNameも引き継ぐ
      const createFn = (row) => createReviewApi(bookId, row);
      createFn.displayName = createReviewApi.displayName;

      await createOrUpdateReviews(
        setError,
        setLoading,
        newRows,
        createFn, // displayNameを保持した関数を渡す
        setRowErrors,
        reviews,
        setReviews
      );
    } catch (error) {
      setError(error);
    }

    function removeRowError(row) {
      const rowIds = row.map((r) => r.id);
      setRowErrors((currentErrors) => {
        const remainingErrors = { ...currentErrors };
        rowIds.forEach((id) => delete remainingErrors[id]);
        return remainingErrors;
      });
    }
  };

  const useDeleteData = async () => {
    try {
      const rowsToDelete = reviews.filter((review) =>
        selectedIds.includes(review.id)
      );
      const { successfulResults } = await handlePromiseAll({
        setError,
        setLoading,
        rows: rowsToDelete,
        crudFunction: deleteReviewApi,
      });

      if (successfulResults.length > 0) {
        const successfulIds = new Set(
          successfulResults.map(({ row }) => row.id)
        );
        setReviews((prevReviews) =>
          prevReviews.filter((r) => !successfulIds.has(r.id))
        );
        setSelectedIds([]);
      }
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
