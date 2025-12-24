import { Height } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';

// 共通のスタイルを定義
export const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'Noto Sans JP',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
          backgroundColor: "##fafafa",
          border: "1px solid #e0e0e0",
        },
        columnHeaders: {
          backgroundColor: "#f0f0f0", // ヘッダーの色をExcelのように薄い灰色に
          fontSize: "1rem",
          fontWeight: "bold",
        },
      },
      defaultProps: {
        density: "comfortable", // デフォルトの密度を「ゆったり」に統一
        rowHeight: 35, // 行の高さを狭くする
      },
    },
  },
});
