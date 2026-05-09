import React from 'react';
import { useNavigate } from 'react-router-dom';

const Clients = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '32px', fontFamily: 'sans-serif', backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <button
            onClick={() => navigate('/admin/dashboard')}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#fff',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            ← 대시보드로 돌아가기
          </button>

          <h1 style={{ margin: 0, color: '#222' }}>📝 거래처 상담 기록</h1>
          <p style={{ marginTop: '8px', color: '#666' }}>
            거래처별 상담 내용, 견적, 다음 액션을 기록하는 페이지입니다.
          </p>
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
          <h2 style={{ marginTop: 0 }}>새 상담 기록 등록</h2>

          <div style={{ display: 'grid', gap: '14px' }}>
            <input
              type="text"
              placeholder="거래처명 예: 제주 ○○카페"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <input
              type="text"
              placeholder="담당자명"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <input
              type="text"
              placeholder="연락처"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <input
              type="date"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <textarea
              placeholder="상담 내용 예: 커피머신 교체 상담, 마케팅 운영 제안, 견적 전달 예정"
              rows={5}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                resize: 'vertical'
              }}
            />

            <textarea
              placeholder="다음 액션 예: 다음 주 재방문, 견적서 발송, 계약서 준비"
              rows={4}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                resize: 'vertical'
              }}
            />

            <button
              onClick={() => alert('다음 단계에서 Firebase 저장 기능을 연결합니다.')}
              style={{
                padding: '14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#333',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              상담 기록 저장
            </button>
          </div>
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
          <h2 style={{ marginTop: 0 }}>등록된 상담 기록</h2>
          <p style={{ color: '#666' }}>
            아직 저장 기능은 연결하지 않았습니다. 다음 단계에서 Firestore와 연결합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Clients;
