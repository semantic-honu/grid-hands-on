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

      const failedResults = results
        .map((result, index) => ({ result, row: rows[index] }))
        .filter(({ result }) => result.status === "rejected");

      return { successfulResults, failedResults };
    })
    .catch((err) => {
      setError(err);
      throw err;
    })
    .finally(() => setLoading(false));
};

export default handlePromiseAll;
