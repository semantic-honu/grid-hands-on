import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#7aa2ff' : '#90caf9',
      light: mode === 'light' ? '#e3f2fd' : '#424242',
    },
    background: {
      default: mode === 'light' ? '#ffffff' : '#121212',
      paper: mode === 'light' ? '#fafafa' : '#1e1e1e',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Noto Sans JP',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
          },
          '&.Mui-focusVisible': {
            outline: `2px solid ${mode === 'light' ? '#7aa2ff' : '#90caf9'}`,
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: mode === 'light' ? "0px 4px 12px rgba(0,0,0,0.05)" : "0px 4px 20px rgba(0,0,0,0.3)",
          backgroundColor: mode === 'light' ? "#fafafa" : "#1a1a1a", // 全体の背景も暗く
          border: `1px solid ${mode === 'light' ? '#e0e0e0' : '#2d2d2d'}`,
          // 境界線の色
          '& .MuiDataGrid-withBorderColor': {
            borderColor: mode === 'light' ? '#f0f0f0' : '#2d2d2d',
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none !important',
          },
          '& .MuiDataGrid-cell.Mui-focusVisible': {
            outline: `2px solid ${mode === 'light' ? '#7aa2ff' : '#90caf9'} !important`,
            outlineOffset: '-2px',
          },
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none !important',
          },
          '& .MuiDataGrid-columnHeader.Mui-focusVisible': {
            outline: `2px solid ${mode === 'light' ? '#7aa2ff' : '#90caf9'} !important`,
            outlineOffset: '-2px',
          },
          // グリッド内の文字色調整
          '& .MuiDataGrid-cell': {
            color: mode === 'light' ? 'inherit' : '#e0e0e0',
          },
        },
        columnHeaders: {
          backgroundColor: mode === 'light' ? "#f0f0f0" : "#111111", // さらに深みのある色へ
          fontSize: "1rem",
          fontWeight: "bold",
          color: mode === 'light' ? 'inherit' : '#e0e0e0',
          borderBottom: `1px solid ${mode === 'light' ? '#e0e0e0' : '#2d2d2d'}`,
        },
      },
      defaultProps: {
        density: "comfortable",
        rowHeight: 35,
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
          '&:before': {
            display: 'none',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
          },
          '&.Mui-focusVisible': {
            backgroundColor: mode === 'light' ? 'rgba(122, 162, 255, 0.1)' : 'rgba(144, 202, 249, 0.1)',
            outline: `2px solid ${mode === 'light' ? '#7aa2ff' : '#90caf9'}`,
          },
        },
      },
    },
  },
});
