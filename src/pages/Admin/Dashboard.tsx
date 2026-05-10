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
    <div
      style={{
        padding: '32px',
        fontFamily: 'sans-serif',
        backgroundColor: '#f7f7f7',
        minHeight: '100vh'
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px'
          }}
        >
          <div>
            <h1 style={{ margin: 0, color: '#222' }}>🚀 ARC ADMIN DASHBOARD</h1>
            <p style={{ marginTop: '8px', color: '#666' }}>
              로그인 성공! 사장님만의 관리 메뉴를 이곳에서 운영합니다.
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: '12px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#333',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer'
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
          <h3 style={{ marginTop: 0 }}>오늘의 업무 현황</h3>
          <p style={{ margin: 0 }}>
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
            <p style={{ color: '#666' }}>
              방문 일정, 미팅 일정, 계약 예정일을 관리합니다.
            </p>
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
            <p style={{ color: '#666' }}>
              거래처별 상담 내용, 견적, 다음 액션을 기록합니다.
            </p>
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

          <div
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
            }}
          >
            <h3 style={{ marginTop: 0 }}>📚 영업 자료 게시판</h3>
            <p style={{ color: '#666' }}>
              영업 상품, 제안 방법, 고객 반박 대응, 영업 스크립트를 정리합니다.
            </p>
            <button
              onClick={() => navigate('/admin/sales-notes')}
              style={{
                marginTop: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #333',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              영업 자료 열기
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
            <h3 style={{ marginTop: 0 }}>📄 견적서 관리</h3>
            <p style={{ color: '#666' }}>
              거래처별 견적서를 작성하고 PDF로 저장합니다.
            </p>
            <button
              onClick={() => navigate('/admin/estimates')}
              style={{
                marginTop: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #333',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              견적서 열기
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
            <h3 style={{ marginTop: 0 }}>📌 작업 현황 관리</h3>
            <p style={{ color: '#666' }}>
              거래처별 작업을 대기, 진행, 완료 상태로 관리합니다.
            </p>
            <button
              onClick={() => navigate('/admin/work-status')}
              style={{
                marginTop: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #333',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              작업 현황 열기
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
            <h3 style={{ marginTop: 0 }}>💰 매출 관리</h3>
            <p style={{ color: '#666' }}>
              월매출, 연매출, 컨설팅·마케팅·상품·제휴 매출을 관리합니다.
            </p>
            <button
              onClick={() => navigate('/admin/sales-ledger')}
              style={{
                marginTop: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #333',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              매출 관리 열기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
