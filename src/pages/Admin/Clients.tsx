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

type ClientRecord = {
  id: string;
  companyName: string;
  managerName: string;
  phone: string;
  consultDate: string;
  consultContent: string;
  nextAction: string;
};

const Clients = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [phone, setPhone] = useState('');
  const [consultDate, setConsultDate] = useState('');
  const [consultContent, setConsultContent] = useState('');
  const [nextAction, setNextAction] = useState('');

  const [records, setRecords] = useState<ClientRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchRecords = async () => {
    const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ClientRecord, 'id'>)
    }));

    setRecords(data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const resetForm = () => {
    setCompanyName('');
    setManagerName('');
    setPhone('');
    setConsultDate('');
    setConsultContent('');
    setNextAction('');
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!companyName || !consultDate || !consultContent) {
      alert('거래처명, 상담일자, 상담내용은 꼭 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        const recordRef = doc(db, 'clients', editingId);

        await updateDoc(recordRef, {
          companyName,
          managerName,
          phone,
          consultDate,
          consultContent,
          nextAction,
          updatedAt: serverTimestamp()
        });

        alert('상담 기록이 수정되었습니다.');
      } else {
        await addDoc(collection(db, 'clients'), {
          companyName,
          managerName,
          phone,
          consultDate,
          consultContent,
          nextAction,
          createdAt: serverTimestamp()
        });

        alert('상담 기록이 저장되었습니다.');
      }

      resetForm();
      await fetchRecords();
    } catch (error) {
      console.error('Client Record Save Error:', error);
      alert('상담 기록 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record: ClientRecord) => {
    setEditingId(record.id);
    setCompanyName(record.companyName);
    setManagerName(record.managerName || '');
    setPhone(record.phone || '');
    setConsultDate(record.consultDate);
    setConsultContent(record.consultContent);
    setNextAction(record.nextAction || '');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('이 상담 기록을 정말 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'clients', id));
      await fetchRecords();
      alert('상담 기록이 삭제되었습니다.');
    } catch (error) {
      console.error('Client Record Delete Error:', error);
      alert('상담 기록 삭제 중 오류가 발생했습니다.');
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
          <h2 style={{ marginTop: 0 }}>
            {editingId ? '상담 기록 수정' : '새 상담 기록 등록'}
          </h2>

          {editingId && (
            <p style={{ color: '#666', marginTop: '-8px' }}>
              현재 기존 상담 기록을 수정하는 중입니다.
            </p>
          )}

          <div style={{ display: 'grid', gap: '14px' }}>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="거래처명 예: 제주 ○○카페"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <input
              type="text"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              placeholder="담당자명"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="연락처"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <input
              type="date"
              value={consultDate}
              onChange={(e) => setConsultDate(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <textarea
              value={consultContent}
              onChange={(e) => setConsultContent(e.target.value)}
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
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
              placeholder="다음 액션 예: 다음 주 재방문, 견적서 발송, 계약서 준비"
              rows={4}
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
                {loading ? '처리 중...' : editingId ? '상담 기록 수정 저장' : '상담 기록 저장'}
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
          <h2 style={{ marginTop: 0 }}>등록된 상담 기록</h2>

          {records.length === 0 ? (
            <p style={{ color: '#666' }}>아직 등록된 상담 기록이 없습니다.</p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {records.map((record) => (
                <div
                  key={record.id}
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '10px',
                    padding: '16px',
                    backgroundColor: '#fafafa'
                  }}
                >
                  <strong>{record.consultDate}</strong>

                  <p style={{ margin: '8px 0 4px', fontWeight: 'bold' }}>
                    {record.companyName}
                    {record.managerName && ` · ${record.managerName}`}
                  </p>

                  {record.phone && (
                    <p style={{ margin: '0 0 8px', color: '#666' }}>
                      연락처: {record.phone}
                    </p>
                  )}

                  <div style={{ marginTop: '10px' }}>
                    <p style={{ margin: '0 0 4px', fontWeight: 'bold' }}>상담 내용</p>
                    <p style={{ margin: 0, color: '#666', whiteSpace: 'pre-wrap' }}>
                      {record.consultContent}
                    </p>
                  </div>

                  {record.nextAction && (
                    <div style={{ marginTop: '12px' }}>
                      <p style={{ margin: '0 0 4px', fontWeight: 'bold' }}>다음 액션</p>
                      <p style={{ margin: 0, color: '#666', whiteSpace: 'pre-wrap' }}>
                        {record.nextAction}
                      </p>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                    <button
                      onClick={() => handleEdit(record)}
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
                      onClick={() => handleDelete(record.id)}
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

export default Clients;
