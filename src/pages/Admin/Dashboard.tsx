import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  return (
    <div style={{ padding: '32px', fontFamily: 'sans-serif', backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div>
            <h1 style={{ margin: 0, color: '#222' }}>🚀 ARC ADMIN DASHBOARD</h1>
            <p style={{ marginTop: '8px', color: '#666' }}>
              로그인 성공! 사장님만의 관리 메뉴를 이곳에서 운영합니다.
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#333',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            로그아웃
          </button>
        </div>

        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
          }}
        >
          <h2 style={{ marginTop: 0 }}>[ 오늘의 업무 현황 ]</h2>
          <p>환영합니다, 사장님. 현재 시스템 정상 가동 중입니다.</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '16px' 
        }}>
          <div
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
            }}
          >
            <h3 style={{ marginTop: 0 }}>📅 영업 스케줄러</h3>
            <p style={{ color: '#666' }}>방문 일정, 미팅 일정, 계약 예정일을 관리합니다.</p>
            <button
              onClick={() => navigate('/admin/schedule')}
              style={{
                marginTop: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #333',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              스케줄러 열기
            </button>
          </div>

          <div
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
            }}
          >
            <h3 style={{ marginTop: 0 }}>📝 거래처 상담 기록</h3>
            <p style={{ color: '#666' }}>거래처별 상담 내용, 견적, 다음 액션을 기록합니다.</p>
            <button
              onClick={() => navigate('/admin/clients')}
              style={{
                marginTop: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #333',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              상담 기록 열기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
