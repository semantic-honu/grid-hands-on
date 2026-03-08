import { useCallback } from "react";
import { fetchReviewsApi } from "../api/reviewApi";

// 星の数と数値の相互変換マップ
const reverseStarsMap = {
    1: '★',
    2: '★★',
    3: '★★★',
    4: '★★★★',
    5: '★★★★★',
};

const useLoadReviews = ({ setLoading, setReviews, setRowErrors, setError, bookId }) => {
    const loadReviews = useCallback(async () => {
        if (!bookId) return;
        setLoading(true);
        try {
            const res = await fetchReviewsApi(bookId);
            // 数値を星(★)に変換して保存
            const starsReviews = res.map(r => ({
                ...r,
                rating: reverseStarsMap[r.rating] || r.rating
            }));
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
