import React from 'react';
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
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

          <h1 style={{ margin: 0, color: '#222' }}>📅 영업 스케줄러</h1>
          <p style={{ marginTop: '8px', color: '#666' }}>
            방문 일정, 미팅 일정, 계약 예정일을 관리하는 페이지입니다.
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
          <h2 style={{ marginTop: 0 }}>새 일정 등록</h2>

          <div style={{ display: 'grid', gap: '14px' }}>
            <input
              type="date"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <input
              type="time"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <input
              type="text"
              placeholder="거래처명 또는 방문 업체명"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <input
              type="text"
              placeholder="일정 제목 예: 커피머신 상담, 마케팅 미팅"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <textarea
              placeholder="메모 예: 견적 전달 예정, 재방문 필요, 계약 가능성 높음"
              rows={5}
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
              일정 저장
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
          <h2 style={{ marginTop: 0 }}>등록된 일정</h2>
          <p style={{ color: '#666' }}>
            아직 저장 기능은 연결하지 않았습니다. 다음 단계에서 Firestore와 연결합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
