import { useCallback } from "react";
import { fetchReviewsApi } from "../api/reviewApi";
import { formatReview } from "../utils/reviewUtils";

const useLoadReviews = ({ setLoading, setReviews, setRowErrors, setError, bookId }) => {
    const loadReviews = useCallback(async () => {
        if (!bookId) return;
        setLoading(true);
        try {
            const res = await fetchReviewsApi(bookId);
            // 数値を星(★)に変換して保存
            const starsReviews = res.map(formatReview);
            setReviews(starsReviews);
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
