import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../../firebase';
import { getAdminTheme, getSavedAdminTheme, AdminThemeMode } from './adminTheme';

type WorkStatusType = '대기' | '진행' | '완료';

type WorkItem = {
  id: string;
  clientName: string;
  workTitle: string;
  status: WorkStatusType;
  memo: string;
  workDate: string;
};

const WorkStatus = () => {
  const navigate = useNavigate();

  const [themeMode] = useState<AdminThemeMode>(getSavedAdminTheme());
  const theme = getAdminTheme(themeMode);

  const [clientName, setClientName] = useState('');
  const [workTitle, setWorkTitle] = useState('');
  const [status, setStatus] = useState<WorkStatusType>('대기');
  const [memo, setMemo] = useState('');
  const [workDate, setWorkDate] = useState('');

  const [works, setWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box' as const,
    padding: '12px',
    borderRadius: '8px',
    border: `1px solid ${theme.border}`,
    backgroundColor: theme.cardBgSoft,
    color: theme.text
  };

  const cardStyle = {
    backgroundColor: theme.cardBg,
    border: `1px solid ${theme.border}`,
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: theme.shadow
  };

  const outlineButtonStyle = {
    padding: '10px 16px',
    borderRadius: '8px',
    border: `1px solid ${theme.border}`,
    backgroundColor: theme.outlineButtonBg,
    color: theme.text,
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const fetchWorks = async () => {
    const q = query(collection(db, 'workStatus'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Omit<WorkItem, 'id'>)
    }));

    setWorks(data);
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  const resetForm = () => {
    setClientName('');
    setWorkTitle('');
    setStatus('대기');
    setMemo('');
    setWorkDate('');
    setEditingId(null);
  };

  const getStatusStyle = (value: WorkStatusType) => {
    if (value === '완료') {
      return {
        backgroundColor: theme.isDark ? '#123524' : '#e8f8ef',
        color: theme.isDark ? '#7ee2a8' : '#1e8449',
        border: theme.isDark ? '1px solid #1e8449' : '1px solid #a9dfbf'
      };
    }

    if (value === '진행') {
      return {
        backgroundColor: theme.isDark ? '#12243f' : '#eaf2ff',
        color: theme.isDark ? '#93c5fd' : '#1f5fbf',
        border: theme.isDark ? '1px solid #2563eb' : '1px solid #b7d4ff'
      };
    }

    return {
      backgroundColor: theme.isDark ? '#374151' : '#f2f2f2',
      color: theme.isDark ? '#d1d5db' : '#666',
      border: theme.isDark ? '1px solid #4b5563' : '1px solid #ddd'
    };
  };

  const handleSave = async () => {
    if (!clientName || !workTitle || !workDate) {
      alert('거래처명, 작업명, 작업일자는 꼭 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      const workData = {
        clientName,
        workTitle,
        status,
        memo,
        workDate
      };

      if (editingId) {
        const workRef = doc(db, 'workStatus', editingId);

        await updateDoc(workRef, {
          ...workData,
          updatedAt: serverTimestamp()
        });

        alert('작업 현황이 수정되었습니다.');
      } else {
        await addDoc(collection(db, 'workStatus'), {
          ...workData,
          createdAt: serverTimestamp()
        });

        alert('작업 현황이 저장되었습니다.');
      }

      resetForm();
      await fetchWorks();
    } catch (error) {
      console.error('Work Status Save Error:', error);
      alert('작업 현황 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (work: WorkItem) => {
    setEditingId(work.id);
    setClientName(work.clientName || '');
    setWorkTitle(work.workTitle || '');
    setStatus(work.status || '대기');
    setMemo(work.memo || '');
    setWorkDate(work.workDate || '');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('이 작업 현황을 정말 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'workStatus', id));
      await fetchWorks();
      alert('작업 현황이 삭제되었습니다.');
    } catch (error) {
      console.error('Work Status Delete Error:', error);
      alert('작업 현황 삭제 중 오류가 발생했습니다.');
    }
  };

  const waitingCount = works.filter((work) => work.status === '대기').length;
  const progressCount = works.filter((work) => work.status === '진행').length;
  const doneCount = works.filter((work) => work.status === '완료').length;

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
        <div style={{ marginBottom: '32px' }}>
          <button
            onClick={() => navigate('/admin/dashboard')}
            style={{
              ...outlineButtonStyle,
              marginBottom: '20px'
            }}
          >
            ← 대시보드로 돌아가기
          </button>

          <h1 style={{ margin: 0, color: theme.text }}>📌 작업 현황 관리</h1>
          <p style={{ marginTop: '8px', color: theme.subText }}>
            거래처별 작업 진행 상태를 대기, 진행, 완료로 관리합니다.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginBottom: '24px'
          }}
        >
          <div
            style={{
              backgroundColor: theme.cardBg,
              borderRadius: '12px',
              padding: '20px',
              border: `1px solid ${theme.border}`
            }}
          >
            <p style={{ margin: 0, color: theme.subText }}>대기</p>
            <strong style={{ fontSize: '28px', color: theme.subText }}>
              {waitingCount}건
            </strong>
          </div>

          <div
            style={{
              backgroundColor: theme.cardBg,
              borderRadius: '12px',
              padding: '20px',
              border: theme.isDark ? '1px solid #2563eb' : '1px solid #b7d4ff'
            }}
          >
            <p style={{ margin: 0, color: theme.isDark ? '#93c5fd' : '#1f5fbf' }}>진행</p>
            <strong style={{ fontSize: '28px', color: theme.isDark ? '#93c5fd' : '#1f5fbf' }}>
              {progressCount}건
            </strong>
          </div>

          <div
            style={{
              backgroundColor: theme.cardBg,
              borderRadius: '12px',
              padding: '20px',
              border: theme.isDark ? '1px solid #1e8449' : '1px solid #a9dfbf'
            }}
          >
            <p style={{ margin: 0, color: theme.isDark ? '#7ee2a8' : '#1e8449' }}>완료</p>
            <strong style={{ fontSize: '28px', color: theme.isDark ? '#7ee2a8' : '#1e8449' }}>
              {doneCount}건
            </strong>
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={{ marginTop: 0, color: theme.text }}>
            {editingId ? '작업 현황 수정' : '새 작업 현황 등록'}
          </h2>

          {editingId && (
            <p style={{ color: theme.subText, marginTop: '-8px' }}>
              현재 기존 작업 현황을 수정하는 중입니다.
            </p>
          )}

          <div style={{ display: 'grid', gap: '14px' }}>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="거래처명 예: 블리스풀, 올라운더커피랩"
              style={inputStyle}
            />

            <input
              type="text"
              value={workTitle}
              onChange={(e) => setWorkTitle(e.target.value)}
              placeholder="작업명 예: 홈페이지 수정, 견적서 발송, 마케팅 제안"
              style={inputStyle}
            />

            <input
              type="date"
              value={workDate}
              onChange={(e) => setWorkDate(e.target.value)}
              style={inputStyle}
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as WorkStatusType)}
              style={inputStyle}
            >
              <option value="대기">대기</option>
              <option value="진행">진행</option>
              <option value="완료">완료</option>
            </select>

            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모 예: 자료 전달 대기, 고객 확인 중, 작업 완료 후 연락 필요"
              rows={5}
              style={{
                ...inputStyle,
                resize: 'vertical'
              }}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleSave}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: theme.buttonBg,
                  color: theme.buttonText,
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {loading ? '처리 중...' : editingId ? '작업 현황 수정 저장' : '작업 현황 저장'}
              </button>

              {editingId && (
                <button
                  onClick={resetForm}
                  type="button"
                  style={outlineButtonStyle}
                >
                  수정 취소
                </button>
              )}
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={{ marginTop: 0, color: theme.text }}>등록된 작업 현황</h2>

          {works.length === 0 ? (
            <p style={{ color: theme.subText }}>아직 등록된 작업 현황이 없습니다.</p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {works.map((work) => (
                <div
                  key={work.id}
                  style={{
                    border: `1px solid ${theme.border}`,
                    borderRadius: '10px',
                    padding: '16px',
                    backgroundColor: theme.cardBgSoft
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '5px 10px',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        ...getStatusStyle(work.status || '대기')
                      }}
                    >
                      {work.status || '대기'}
                    </span>

                    <strong style={{ color: theme.text }}>
                      [{work.status || '대기'}] {work.clientName}
                    </strong>
                  </div>

                  <p style={{ margin: '10px 0 4px', fontWeight: 'bold', color: theme.text }}>
                    {work.workTitle}
                  </p>

                  <p style={{ margin: '0 0 8px', color: theme.subText }}>
                    작업일자: {work.workDate}
                  </p>

                  {work.memo && (
                    <p style={{ margin: 0, color: theme.subText, whiteSpace: 'pre-wrap' }}>
                      {work.memo}
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleEdit(work)}
                      style={outlineButtonStyle}
                    >
                      수정
                    </button>

                    <button
                      onClick={() => handleDelete(work.id)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #e74c3c',
                        backgroundColor: theme.outlineButtonBg,
                        color: '#e74c3c',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkStatus;
