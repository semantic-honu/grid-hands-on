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
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useBlocker,
  useNavigate,
  Navigate,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "react-error-boundary";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import { getTheme } from "./theme/theme";
import MenuBar from "./components/MenuBar";
import BookPage from "./pages/BookPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorFallback from "./components/ErrorFallback";
import logo from "./assets/logo.svg";
import ReviewPage from "./pages/ReviewPage";
import { useGridStore } from "./stores/useGridStore";

// 認証チェック用コンポーネント
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// レイアウトコンポーネント
function LayoutWrapper({ mode, toggleColorMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const navigate = useNavigate();

  const hasUnsavedChanges = useGridStore((state) => state.hasUnsavedChanges);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const blocker = useBlocker(
    useCallback(
      ({ currentLocation, nextLocation }) =>
        hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname,
      [hasUnsavedChanges],
    ),
  );

  return (
    <Box sx={{ display: "flex" }}>
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
          background:
            mode === "light"
              ? "linear-gradient(90deg, #7aa2ff, #ea9ff4)"
              : "linear-gradient(90deg, #1e3a8a, #000000)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
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
          <img
            src={logo}
            alt="Logo"
            style={{ width: "40px", paddingRight: "12px" }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, color: "rgba(255, 255, 255, 0.9)" }}
          >
            本とレビューの管理アプリ
          </Typography>

          {user.username && (
            <Typography
              variant="body1"
              sx={{ mr: 2, color: "rgba(255, 255, 255, 0.8)" }}
            >
              ユーザー: {user.username}
            </Typography>
          )}

          <IconButton
            onClick={toggleColorMode}
            color="inherit"
            sx={{ color: "rgba(255, 255, 255, 0.9)" }}
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton
            onClick={handleLogout}
            color="inherit"
            title="ログアウト"
            sx={{ color: "rgba(255, 255, 255, 0.9)" }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <MenuBar open={menuOpen} onClose={handleMenuToggle} />

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Outlet />
        </ErrorBoundary>
      </Box>
    </Box>
  );
}

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage mode={mode} toggleColorMode={toggleColorMode} />,
    },
    {
      path: "/register",
      element: <RegisterPage mode={mode} toggleColorMode={toggleColorMode} />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <LayoutWrapper mode={mode} toggleColorMode={toggleColorMode} />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <BookPage /> },
        { path: "reviews", element: <ReviewPage /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
