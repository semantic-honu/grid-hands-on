import { useCallback } from "react";
import { fetchBooksApi } from "../api/bookApi";

const useLoadBooks = ({ setLoading, setBooks, setRowErrors, setError }) => {
    const loadBooks = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchBooksApi();
            setBooks(res);
            setRowErrors({}); // ロード成功時にエラーをクリア
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [setLoading, setBooks, setRowErrors, setError]);

    return { loadBooks };
};

export default useLoadBooks;