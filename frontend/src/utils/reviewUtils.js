import { handlePromiseAll } from "./promiseUtils.js";
import snackbarUtils from "./snackbarUtils";

// 星の数と数値の相互変換マップ
const starsMap = {
    '★': 1,
    '★★': 2,
    '★★★': 3,
    '★★★★': 4,
    '★★★★★': 5,
};

const reverseStarsMap = {
    1: '★',
    2: '★★',
    3: '★★★',
    4: '★★★★',
    5: '★★★★★',
};

export const createOrUpdateReviews = async (setError,
    setLoading,
    rows,
    crudFunction,
    setRowErrors,
    reviews,
    setReviews
) => {
    // 1. APIに送る前に星(★)を数値(1-5)に変換
    const rowsWithNumericRating = rows.map(r => ({
        ...r,
        rating: starsMap[r.rating] || r.rating
    }));

    try {
        const { successfulResults, failedResults } = await handlePromiseAll({
            setLoading,
            rows: rowsWithNumericRating, // 数値版を渡す
            crudFunction,
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
                        snackbarUtils.error(
                            `行ID ${row.id} のエラー: ${errorDetail?.message || "不明なエラー"
                            }`
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

        // 成功処理
        if (successfulResults.length > 0) {
            const updatedReviews = reviews.map((review) => {
                const success = successfulResults.find(
                    ({ row }) => row.id === review.id
                );
                if (success) {
                    // 2. APIから戻ってきた数値(1-5)を星(★)に戻してStateに保存
                    const backendData = success.result.value.data;
                    return {
                        ...backendData,
                        rating: reverseStarsMap[backendData.rating] || backendData.rating,
                        isNew: undefined,
                        isUpdate: undefined,
                    };
                }
                return review;
            });
            setReviews(updatedReviews);
        }
    } catch (error) {
        setError(error);
    }
};
