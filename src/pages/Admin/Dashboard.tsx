import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { getAdminTheme, getSavedAdminTheme, saveAdminTheme, AdminThemeMode } from './adminTheme';

const Dashboard = () => {
  const navigate = useNavigate();
  const [themeMode, setThemeMode] = useState<AdminThemeMode>(getSavedAdminTheme());
  const theme = getAdminTheme(themeMode);

  const toggleTheme = () => {
    const nextTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextTheme);
    saveAdminTheme(nextTheme);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const cardStyle = {
  backgroundColor: theme.cardBg,
  border: `1px solid ${theme.border}`,
  borderRadius: '12px',
  padding: '24px',
  boxShadow: theme.shadow,
  display: 'flex',
  flexDirection: 'column' as const,
  minHeight: '170px'
};

  const outlineButtonStyle = {
  marginTop: 'auto',
  padding: '10px 14px',
  borderRadius: '8px',
  border: `1px solid ${theme.border}`,
  backgroundColor: theme.outlineButtonBg,
  color: theme.text,
  cursor: 'pointer',
  fontWeight: 'bold',
  alignSelf: 'flex-start'
};

  return (
    <div
      style={{
        padding: '32px',
        fontFamily: 'sans-serif',
        backgroundColor: theme.pageBg,
        color: theme.text,
        minHeight: '100vh'
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <h1 style={{ margin: 0, color: theme.text }}>🚀 ARC ADMIN DASHBOARD</h1>
            <p style={{ marginTop: '8px', color: theme.subText }}>
              로그인 성공! 사장님만의 관리 메뉴를 이곳에서 운영합니다.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={toggleTheme}
              style={{
                padding: '12px 18px',
                borderRadius: '8px',
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.outlineButtonBg,
                color: theme.text,
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {themeMode === 'dark' ? '☀️ 라이트모드' : '🌙 다크모드'}
            </button>

            <button
              onClick={handleLogout}
              style={{
                padding: '12px 18px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: theme.buttonBg,
                color: theme.buttonText,
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              로그아웃
            </button>
          </div>
        </div>

        <div
          style={{
            backgroundColor: theme.cardBg,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: theme.shadow
          }}
        >
          <h3 style={{ marginTop: 0, color: theme.text }}>오늘의 업무 현황</h3>
          <p style={{ margin: 0, color: theme.subText }}>
            환영합니다, 사장님. 현재 시스템 정상 가동 중입니다.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px'
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: theme.text }}>📅 영업 스케줄러</h3>
            <p style={{ color: theme.subText }}>
              방문 일정, 미팅 일정, 계약 예정일을 관리합니다.
            </p>
            <button onClick={() => navigate('/admin/schedule')} style={outlineButtonStyle}>
              스케줄러 열기
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: theme.text }}>📝 거래처 상담 기록</h3>
            <p style={{ color: theme.subText }}>
              거래처별 상담 내용, 견적, 다음 액션을 기록합니다.
            </p>
            <button onClick={() => navigate('/admin/clients')} style={outlineButtonStyle}>
              상담 기록 열기
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: theme.text }}>📚 영업 자료 게시판</h3>
            <p style={{ color: theme.subText }}>
              영업 상품, 제안 방법, 고객 반박 대응, 영업 스크립트를 정리합니다.
            </p>
            <button onClick={() => navigate('/admin/sales-notes')} style={outlineButtonStyle}>
              영업 자료 열기
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: theme.text }}>📄 견적서 관리</h3>
            <p style={{ color: theme.subText }}>
              거래처별 견적서를 작성하고 PDF로 저장합니다.
            </p>
            <button onClick={() => navigate('/admin/estimates')} style={outlineButtonStyle}>
              견적서 열기
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: theme.text }}>📌 작업 현황 관리</h3>
            <p style={{ color: theme.subText }}>
              거래처별 작업을 대기, 진행, 완료 상태로 관리합니다.
            </p>
            <button onClick={() => navigate('/admin/work-status')} style={outlineButtonStyle}>
              작업 현황 열기
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: theme.text }}>💰 매출 관리</h3>
            <p style={{ color: theme.subText }}>
              월매출, 연매출, 컨설팅·마케팅·상품·제휴 매출을 관리합니다.
            </p>
            <button onClick={() => navigate('/admin/sales-ledger')} style={outlineButtonStyle}>
              매출 관리 열기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
