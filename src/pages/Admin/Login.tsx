import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // 아까 만든 설정파일 연결

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 구글 서버에 "이 사람 사장님 맞아?"라고 물어보는 명령
      await signInWithEmailAndPassword(auth, email, password);
      
      // 로그인 성공 시 대시보드로 이동
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('이메일 또는 비밀번호가 일치하지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      height: '100vh', backgroundColor: '#f5f5f5', fontFamily: 'sans-serif' 
    }}>
      <div style={{ 
        width: '100%', maxWidth: '400px', padding: '40px', 
        backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' 
      }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '10px' }}>ARC ADMIN</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>관제 시스템 로그인</p>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#555' }}>Admin Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#555' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
            />
          </div>

          {error && <p style={{ color: '#e74c3c', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', padding: '14px', borderRadius: '6px', border: 'none', 
              backgroundColor: '#333', color: 'white', fontWeight: 'bold', cursor: 'pointer',
              transition: 'background-color 0.2s'
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
