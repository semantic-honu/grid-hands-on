import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Paper, 
  Alert,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { registerUser } from '../api/userApi';
import logo from "../assets/logo.svg";

const RegisterPage = ({ mode, toggleColorMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await registerUser({ username, password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || '登録に失敗しました。');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
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
          <img src={logo} alt="Logo" style={{ width: "40px", paddingRight: "12px" }} />
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, color: "rgba(255, 255, 255, 0.9)" }}>
            本とレビューの管理アプリ
          </Typography>
          <IconButton
            onClick={toggleColorMode}
            color="inherit"
            sx={{ color: "rgba(255, 255, 255, 0.9)" }}
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Container maxWidth="xs" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2 }}>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              新規登録
            </Typography>
            {success && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>登録が完了しました！ログイン画面へ移動します。</Alert>}
            {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleRegister} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="ユーザー名"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="パスワード (8文字以上)"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                inputProps={{ minLength: 8 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.2, fontWeight: 'bold' }}
              >
                登録する
              </Button>
              <Button
                fullWidth
                variant="text"
                onClick={() => navigate('/login')}
              >
                ログインはこちら
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>

      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', textAlign: 'center', opacity: 0.7 }}>
        <Typography variant="caption" color="text.secondary">
          ※このアプリは学習目的で公開されています。入力された内容は時間が経つと消えることがあります。<br />
          個人情報は入力しないようお願いします。
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
