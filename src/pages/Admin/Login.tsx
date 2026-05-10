import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { getAdminTheme, getSavedAdminTheme, saveAdminTheme, AdminThemeMode } from './adminTheme';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [themeMode, setThemeMode] = useState<AdminThemeMode>(getSavedAdminTheme());
  const theme = getAdminTheme(themeMode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleTheme = () => {
    const nextTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextTheme);
    saveAdminTheme(nextTheme);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Firebase Login Error:', err.code, err.message);
      setError('이메일 또는 비밀번호가 일치하지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: `1px solid ${theme.border}`,
    boxSizing: 'border-box' as const,
    backgroundColor: theme.cardBgSoft,
    color: theme.text
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: theme.pageBg,
        fontFamily: 'sans-serif',
        color: theme.text,
        padding: '24px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '40px',
          backgroundColor: theme.cardBg,
          borderRadius: '12px',
          border: `1px solid ${theme.border}`,
          boxShadow: theme.shadow
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button
            onClick={toggleTheme}
            type="button"
            style={{
              padding: '9px 12px',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
              backgroundColor: theme.outlineButtonBg,
              color: theme.text,
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {themeMode === 'dark' ? '☀️ 라이트모드' : '🌙 다크모드'}
          </button>
        </div>

        <h1 style={{ textAlign: 'center', color: theme.text, marginBottom: '10px' }}>
          ARC ADMIN
        </h1>

        <p style={{ textAlign: 'center', color: theme.subText, marginBottom: '30px' }}>
          관제 시스템 로그인
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: theme.subText }}>
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: theme.subText }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={inputStyle}
            />
          </div>

          {error && (
            <p
              style={{
                color: '#e74c3c',
                fontSize: '14px',
                marginBottom: '20px',
                textAlign: 'center'
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: theme.buttonBg,
              color: theme.buttonText,
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {loading ? '인증 중...' : '관리자 로그인'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
