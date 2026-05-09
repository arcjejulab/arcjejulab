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

type ScheduleItem = {
  id: string;
  date: string;
  time: string;
  clientName: string;
  title: string;
  memo: string;
};

const Schedule = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchSchedules = async () => {
    const q = query(collection(db, 'schedules'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ScheduleItem, 'id'>)
    }));

    setSchedules(data);
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const resetForm = () => {
    setDate('');
    setTime('');
    setClientName('');
    setTitle('');
    setMemo('');
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!date || !time || !clientName || !title) {
      alert('날짜, 시간, 거래처명, 일정 제목은 꼭 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        const scheduleRef = doc(db, 'schedules', editingId);

        await updateDoc(scheduleRef, {
          date,
          time,
          clientName,
          title,
          memo,
          updatedAt: serverTimestamp()
        });

        alert('일정이 수정되었습니다.');
      } else {
        await addDoc(collection(db, 'schedules'), {
          date,
          time,
          clientName,
          title,
          memo,
          createdAt: serverTimestamp()
        });

        alert('일정이 저장되었습니다.');
      }

      resetForm();
      await fetchSchedules();
    } catch (error) {
      console.error('Schedule Save Error:', error);
      alert('일정 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: ScheduleItem) => {
    setEditingId(item.id);
    setDate(item.date);
    setTime(item.time);
    setClientName(item.clientName);
    setTitle(item.title);
    setMemo(item.memo || '');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('이 일정을 정말 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'schedules', id));
      await fetchSchedules();
      alert('일정이 삭제되었습니다.');
    } catch (error) {
      console.error('Schedule Delete Error:', error);
      alert('일정 삭제 중 오류가 발생했습니다.');
    }
  };

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
          <h2 style={{ marginTop: 0 }}>
            {editingId ? '일정 수정' : '새 일정 등록'}
          </h2>

          {editingId && (
            <p style={{ color: '#666', marginTop: '-8px' }}>
              현재 기존 일정을 수정하는 중입니다.
            </p>
          )}

          <div style={{ display: 'grid', gap: '14px' }}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="거래처명 또는 방문 업체명"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="일정 제목 예: 커피머신 상담, 마케팅 미팅"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모 예: 견적 전달 예정, 재방문 필요, 계약 가능성 높음"
              rows={5}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
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
                  backgroundColor: '#333',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {loading ? '처리 중...' : editingId ? '일정 수정 저장' : '일정 저장'}
              </button>

              {editingId && (
                <button
                  onClick={resetForm}
                  type="button"
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid #999',
                    backgroundColor: '#fff',
                    color: '#333',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  수정 취소
                </button>
              )}
            </div>
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

          {schedules.length === 0 ? (
            <p style={{ color: '#666' }}>아직 등록된 일정이 없습니다.</p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {schedules.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '10px',
                    padding: '16px',
                    backgroundColor: '#fafafa'
                  }}
                >
                  <strong>{item.date} {item.time}</strong>
                  <p style={{ margin: '8px 0 4px', fontWeight: 'bold' }}>
                    {item.clientName} · {item.title}
                  </p>

                  {item.memo && (
                    <p style={{ margin: 0, color: '#666', whiteSpace: 'pre-wrap' }}>
                      {item.memo}
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                    <button
                      onClick={() => handleEdit(item)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #333',
                        backgroundColor: '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      수정
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #e74c3c',
                        backgroundColor: '#fff',
                        color: '#e74c3c',
                        cursor: 'pointer'
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

export default Schedule;
