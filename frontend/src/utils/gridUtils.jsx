import { Tooltip } from "@mui/material";

/**
 * DataGridの列定義を生成します。
 * この関数は、セルの値とバリデーションエラーに基づいてセルのレンダリングをカスタマイズします。
 *
 * @param {Array} columnsSchema - 列のスキーマ定義。
 * @param {Object} rowErrors - 行ごとのエラー情報。例: { [rowId]: { [field]: 'message' } }
 * @returns {Array} DataGridに適した列定義の配列。
 */
export const createGridColumns = (columnsSchema, rowErrors = {}) => {
  return columnsSchema.map((col) => ({
    ...col,
    renderCell: (params) => {
      const errorMsg = rowErrors[params.id]?.[params.field];
      let displayValue = params.value ?? "";
      if (col.type === "date" && displayValue) {
        try {
          // 有効な日付文字列か確認してから変換
          const date = new Date(displayValue);
          if (!isNaN(date.getTime())) {
            displayValue = date.toLocaleDateString("ja-JP");
          }
        } catch (e) {
          // displayValueが不正な場合にエラーとならないようにする
          console.error("Invalid date value:", displayValue, e);
        }
      }
      return (
        <Tooltip title={errorMsg || ""} arrow disableHoverListener={!errorMsg}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <span
              style={{
                backgroundColor: errorMsg ? "#ffebee" : "transparent", // 薄い赤
                color: errorMsg ? "#d32f2f" : "inherit", // 濃い赤
                padding: errorMsg ? "2px 8px" : "0", // エラーの時だけ少し内側を塗る
                borderRadius: "4px", // 角を少し丸くする
                fontSize: "0.875rem",
              }}
            >
              {displayValue}
            </span>
          </div>
        </Tooltip>
      );
    },
  }));
};
