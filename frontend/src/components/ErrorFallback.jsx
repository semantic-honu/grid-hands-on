function ErrorFallback({ error }) {
  return (
    <div>
      <h2>エラーが発生しました。</h2>
      <pre>{error.message}</pre>
    </div>
  )
}
export default ErrorFallback