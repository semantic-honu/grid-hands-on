import { useState, useRef } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "react-error-boundary";

import { theme } from "./theme/theme";
import MenuBar from "./components/MenuBar";
import BookPage from "./pages/BookPage";
import AuthorPage from "./pages/AuthorPage";
import ErrorFallback from "./components/ErrorFallback";
import logo from "./assets/react.svg";
import ReviewPage from "./pages/ReviewPage";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  const handleMenuToggle = () => {
    // メニューを閉じる場合、アニメーション完了後にフォーカスを戻す
    if (menuOpen) {
      setTimeout(() => {
        menuButtonRef.current?.focus();
      }, 200);
    }
    setMenuOpen(!menuOpen);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              background:
                // "linear-gradient(90deg, #ff7eb9, #ff65a3, #7afcff, #feff9c)",
                "linear-gradient(90deg,  #7aa2ffff, #ea9ff4ff)",
              // textShadowの値をCSSと同じ形式で文字列として指定します
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
                sx={{ mr: 2 }}
                ref={menuButtonRef}
              >
                <MenuIcon />
              </IconButton>
              <img
                src={logo}
                alt="React Symbol"
                style={{
                  width: "40px", // 好きなサイズに
                  height: "auto", // アスペクト比維持
                  paddingRight: "12px", // 右に余白
                }}
              />
              <Typography variant="h6" noWrap component="div">
                本と作者の管理アプリ
              </Typography>
            </Toolbar>
          </AppBar>
          <MenuBar open={menuOpen} onClose={handleMenuToggle} />
          <Box
            component="main"
            sx={{
              flexDirection: "column",
              flexGrow: 1,
              bgcolor: "background.default",
              p: 3,
            }}
          >
            <Toolbar />
            {/* データグリッド */}
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Routes>
                <Route path="/" element={<BookPage />} />
                <Route path="/authors" element={<AuthorPage />} />
                <Route path="/reviews" element={<ReviewPage />} />
                <Route path="*" element={<NotFound />} /> {/* 404ページ */}
              </Routes>
            </ErrorBoundary>
          </Box>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
