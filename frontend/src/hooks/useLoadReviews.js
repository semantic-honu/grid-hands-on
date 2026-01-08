import { useCallback } from "react";
import { fetchReviewsApi } from "../api/reviewApi";

const useLoadReviews = ({ setLoading, setReviews, setRowErrors, setError, bookId }) => {
    const loadReviews = useCallback(async () => {
        if (!bookId) return;
        setLoading(true);
        try {
            const res = await fetchReviewsApi(bookId);
            setReviews(res);
            setRowErrors({}); // ロード成功時にエラーをクリア
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [bookId, setLoading, setReviews, setRowErrors, setError]);

    return { loadReviews };
};

export default useLoadReviews;
