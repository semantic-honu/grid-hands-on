import { handlePromiseAll } from "./promiseUtils.js";
import snackbarUtils from "./snackbarUtils";

export const createOrUpdateBooks = async (setError,
  setLoading,
  rows,
  crudFunction,
  setRowErrors,
  books, // (後方互換性のため残すが必要なし)
  setBooks
) => {
  try {
    const { successfulResults, failedResults } = await handlePromiseAll({
      setLoading,
      rows,
      crudFunction,
    });

    // 成功通知
    if (successfulResults.length > 0) {
      snackbarUtils.success(`${successfulResults.length}件の${crudFunction.displayName}に成功しました。`);

      // 関数型アップデート (prev) を使って、最新のStateを元に更新する（レースコンディション防止）
      setBooks((prevBooks) => prevBooks.map((book) => {
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
