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
    reviews, // (後方互換性のため残すが必要なし)
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
            rows: rowsWithNumericRating,
            crudFunction,
        });

        // 成功通知
        if (successfulResults.length > 0) {
            snackbarUtils.success(`${successfulResults.length}件の${crudFunction.displayName}に成功しました。`);

            setReviews((prevReviews) => prevReviews.map((review) => {
                const success = successfulResults.find(
                    ({ row }) => row.id === review.id
                );
                if (success) {
                    const backendData = success.result.value.data;
                    return {
                        ...backendData,
                        rating: reverseStarsMap[backendData.rating] || backendData.rating,
                        isNew: undefined,
                        isUpdate: undefined,
                    };
                }
                return review;
            }));
        }

        // 失敗通知
        if (failedResults.length > 0) {
            snackbarUtils.error(`${failedResults.length}件の${crudFunction.displayName}に失敗しました。`);

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
                    } else if (errorDetail && errorDetail.message) {
                        snackbarUtils.error(`エラー: ${errorDetail.message}`);
                    }
                });
                newErrors[row.id] = rowSpecificErrors;
            });
            setRowErrors((currentErrors) => ({
                ...currentErrors,
                ...newErrors,
            }));
        }
    } catch (error) {
        setError(error);
    }
};
