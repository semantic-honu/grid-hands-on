import { handlePromiseAll } from "./promiseUtils.js";

export const createOrUpdateBooks = async (setError,
    setLoading,
    rows,
    crudFunction,
    showNotification,
    setRowErrors,
    books,
    setBooks
) => {

    try {
        const { successfulResults, failedResults } = await handlePromiseAll({
            setError,
            setLoading,
            rows,
            crudFunction,
            showNotification,
        });

        // 失敗処理
        if (failedResults.length > 0) {
            const newErrors = {};
            failedResults.forEach(({ result, row }) => {
                const apiResponseData = result.reason.response?.data;
                const rowSpecificErrors = {};
                const errorsArray = Array.isArray(apiResponseData)
                    ? apiResponseData
                    : [apiResponseData];

                errorsArray.forEach((errorDetail) => {
                    if (errorDetail && errorDetail.field) {
                        rowSpecificErrors[errorDetail.field] = errorDetail.message;
                    } else {
                        showNotification(
                            `行ID ${row.id} のエラー: ${errorDetail?.message || "不明なエラー"
                            }`,
                            "error"
                        );
                    }
                });
                newErrors[row.id] = rowSpecificErrors;
            });
            setRowErrors((currentErrors) => ({
                ...currentErrors,
                ...newErrors,
            }));
        }

        //成功処理
        if (successfulResults.length > 0) {
            const updatedBooks = books.map((book) => {
                if (!book.isNew && !book.isUpdate) return book;
                const success = successfulResults.find(
                    ({ row }) => row.id === book.id
                );
                if (success) {
                    return {
                        ...success.result.value.data,
                        isNew: undefined,
                        isUpdate: undefined,
                    };
                }
                return book;
            });
            setBooks(updatedBooks);
        }
    } catch (error) {
        // usePromiseAll内でsetErrorが呼ばれるが、ここで追加のエラーハンドリングも可能
        setError(error);
    }
};
