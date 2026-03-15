import { useState, useRef, useMemo, useCallback } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { createBrowserRouter, RouterProvider, Outlet, useBlocker } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "react-error-boundary";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";

import { getTheme } from "./theme/theme";
import MenuBar from "./components/MenuBar";
import BookPage from "./pages/BookPage";
import ErrorFallback from "./components/ErrorFallback";
import logo from "./assets/logo.svg";
import ReviewPage from "./pages/ReviewPage";
import { useGridStore } from "./stores/useGridStore";

// レイアウトコンポーネント（ここではルーターのコンテキスト内）
function LayoutWrapper() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  // システムのモード設定
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

  const theme = useMemo(() => getTheme(mode), [mode]);
  const hasUnsavedChanges = useGridStore((state) => state.hasUnsavedChanges);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handleMenuToggle = () => {
    if (menuOpen) {
      setTimeout(() => {
        menuButtonRef.current?.focus();
      }, 200);
    }
    setMenuOpen(!menuOpen);
  };

  // 【重要】唯一のブロッカー。LayoutWrapper が常にマウントされているため、ここで一元管理。
  const blocker = useBlocker(
    useCallback(
      ({ currentLocation, nextLocation }) =>
        hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname,
      [hasUnsavedChanges]
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* 画面遷移確認ダイアログ */}
        <Dialog
          open={blocker.state === "blocked"}
          onClose={() => blocker.reset?.()}
          sx={{ zIndex: 9999 }}
        >
          <DialogTitle>未保存の変更があります</DialogTitle>
          <DialogContent>
            <DialogContentText>
              保存されていない変更がありますが、このまま画面を移動してもよろしいですか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => blocker.reset?.()} color="inherit">
              キャンセル
            </Button>
            <Button onClick={() => blocker.proceed?.()} color="error" autoFocus>
              保存せずに移動
            </Button>
          </DialogActions>
        </Dialog>

        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: mode === 'light'
              ? "linear-gradient(90deg, #7aa2ff, #ea9ff4)"
              : "linear-gradient(90deg, #1e3a8a, #000000)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            fontSize: "2rem",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleMenuToggle}
              edge="start"
              sx={{ mr: 2, color: "rgba(255, 255, 255, 0.9)" }}
              ref={menuButtonRef}
            >
              <MenuIcon />
            </IconButton>
            <img src={logo} alt="Logo" style={{ width: "40px", paddingRight: "12px" }} />
            <Typography variant="h6" noWrap sx={{ flexGrow: 1, color: "rgba(255, 255, 255, 0.9)" }}>
              本とレビューの管理アプリ
            </Typography>
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <MenuBar open={menuOpen} onClose={handleMenuToggle} />

        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
          <Toolbar />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Outlet />
          </ErrorBoundary>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// ルーター自体の定義はコンポーネントの外で行う（再生成を防ぐため）
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      { index: true, element: <BookPage /> },
      { path: "reviews", element: <ReviewPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
