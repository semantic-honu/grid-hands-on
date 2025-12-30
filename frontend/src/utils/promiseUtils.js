import snackbarUtils from "./snackbarUtils";

export const handlePromiseAll = ({
  setError,
  setLoading,
  rows,
  crudFunction,
}) => {
  setLoading(true);

  return Promise.allSettled(rows.map((row) => crudFunction(row)))
    .then((results) => {
      const successfulResults = results
        .map((result, index) => ({ result, row: rows[index] }))
        .filter(({ result }) => result.status === "fulfilled");
      if (successfulResults.length > 0) {
        snackbarUtils.success(`${successfulResults.length}件の${crudFunction.displayName}に成功しました。`);
      }
      const failedResults = results
        .map((result, index) => ({ result, row: rows[index] }))
        .filter(({ result }) => result.status === "rejected");

      if (failedResults.length > 0) {
        snackbarUtils.error(`${failedResults.length}件の${crudFunction.displayName}に失敗しました。`);
      }

      return { successfulResults, failedResults };
    })
    .catch((err) => {
      setError(err);
      throw err; // エラーを再スローして、呼び出し元でもcatchできるようにする
    })
    .finally(() => setLoading(false));
};

export default handlePromiseAll;