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
  CssBaseline
} from '@mui/material';
import { loginUser } from '../api/userApi';
import logo from "../assets/logo.svg";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const user = await loginUser({ username, password });
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('ログインに失敗しました。ユーザー名かパスワードが正しくありません。');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(90deg, #7aa2ff, #ea9ff4)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <img src={logo} alt="Logo" style={{ width: "40px", paddingRight: "12px" }} />
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, color: "rgba(255, 255, 255, 0.9)" }}>
            本とレビューの管理アプリ
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Container maxWidth="xs">
        <Box sx={{ mt: 8 }}>
          <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2 }}>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              ログイン
            </Typography>
            {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
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
                label="パスワード"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.2, fontWeight: 'bold' }}
              >
                ログイン
              </Button>
              <Button
                fullWidth
                variant="text"
                onClick={() => navigate('/register')}
              >
                新規登録はこちら
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
