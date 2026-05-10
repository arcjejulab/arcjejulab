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

type SalesCategory = '컨설팅' | '마케팅' | '상품' | '제휴';

type SalesRecord = {
  id: string;
  salesDate: string;
  clientName: string;
  category: SalesCategory;
  amount: number;
  memo: string;
};

const SalesLedger = () => {
  const navigate = useNavigate();

  const [salesDate, setSalesDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [category, setCategory] = useState<SalesCategory>('상품');
  const [amount, setAmount] = useState<number>(0);
  const [memo, setMemo] = useState('');

  const [records, setRecords] = useState<SalesRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchRecords = async () => {
    const q = query(collection(db, 'salesLedger'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Omit<SalesRecord, 'id'>)
    }));

    setRecords(data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const resetForm = () => {
    setSalesDate('');
    setClientName('');
    setCategory('상품');
    setAmount(0);
    setMemo('');
    setEditingId(null);
  };

  const formatNumber = (value: number) => {
    return Number(value || 0).toLocaleString('ko-KR');
  };

  const getCurrentYear = () => {
    return new Date().getFullYear().toString();
  };

  const getCurrentMonth = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${now.getFullYear()}-${month}`;
  };

  const monthlySales = records
    .filter((record) => record.salesDate?.startsWith(getCurrentMonth()))
    .reduce((sum, record) => sum + Number(record.amount || 0), 0);

  const yearlySales = records
    .filter((record) => record.salesDate?.startsWith(getCurrentYear()))
    .reduce((sum, record) => sum + Number(record.amount || 0), 0);

  const consultingSales = records
    .filter((record) => record.category === '컨설팅')
    .reduce((sum, record) => sum + Number(record.amount || 0), 0);

  const marketingSales = records
    .filter((record) => record.category === '마케팅')
    .reduce((sum, record) => sum + Number(record.amount || 0), 0);

  const productSales = records
    .filter((record) => record.category === '상품')
    .reduce((sum, record) => sum + Number(record.amount || 0), 0);

  const partnershipSales = records
  .filter((record) => record.category === '제휴')
  .reduce((sum, record) => sum + Number(record.amount || 0), 0);

  const getCategoryStyle = (value: SalesCategory) => {
  if (value === '컨설팅') {
    return {
      backgroundColor: '#fff5e6',
      color: '#b26a00',
      border: '1px solid #ffd699'
    };
  }

  if (value === '마케팅') {
    return {
      backgroundColor: '#f0eaff',
      color: '#5b35b1',
      border: '1px solid #d1c2ff'
    };
  }

  if (value === '제휴') {
    return {
      backgroundColor: '#eaf2ff',
      color: '#1f5fbf',
      border: '1px solid #b7d4ff'
    };
  }

  return {
    backgroundColor: '#eafaf8',
    color: '#117864',
    border: '1px solid #a3e4d7'
  };
};

  const handleSave = async () => {
    if (!salesDate || !clientName || !amount) {
      alert('매출일자, 거래처명, 금액은 꼭 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      const salesData = {
        salesDate,
        clientName,
        category,
        amount: Number(amount),
        memo
      };

      if (editingId) {
        const recordRef = doc(db, 'salesLedger', editingId);

        await updateDoc(recordRef, {
          ...salesData,
          updatedAt: serverTimestamp()
        });

        alert('매출 기록이 수정되었습니다.');
      } else {
        await addDoc(collection(db, 'salesLedger'), {
          ...salesData,
          createdAt: serverTimestamp()
        });

        alert('매출 기록이 저장되었습니다.');
      }

      resetForm();
      await fetchRecords();
    } catch (error) {
      console.error('Sales Ledger Save Error:', error);
      alert('매출 기록 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record: SalesRecord) => {
    setEditingId(record.id);
    setSalesDate(record.salesDate || '');
    setClientName(record.clientName || '');
    setCategory(record.category || '상품');
    setAmount(Number(record.amount || 0));
    setMemo(record.memo || '');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('이 매출 기록을 정말 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'salesLedger', id));
      await fetchRecords();
      alert('매출 기록이 삭제되었습니다.');
    } catch (error) {
      console.error('Sales Ledger Delete Error:', error);
      alert('매출 기록 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ padding: '32px', fontFamily: 'sans-serif', backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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

          <h1 style={{ margin: 0, color: '#222' }}>💰 매출 관리</h1>
          <p style={{ marginTop: '8px', color: '#666' }}>
            월매출, 연매출, 컨설팅·마케팅·상품·제휴 매출을 기록하고 관리합니다.
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
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #ddd' }}>
            <p style={{ margin: 0, color: '#666' }}>이번 달 매출</p>
            <strong style={{ fontSize: '24px', color: '#222' }}>{formatNumber(monthlySales)}원</strong>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #ddd' }}>
            <p style={{ margin: 0, color: '#666' }}>올해 매출</p>
            <strong style={{ fontSize: '24px', color: '#222' }}>{formatNumber(yearlySales)}원</strong>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #ffd699' }}>
            <p style={{ margin: 0, color: '#b26a00' }}>컨설팅</p>
            <strong style={{ fontSize: '24px', color: '#b26a00' }}>{formatNumber(consultingSales)}원</strong>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #d1c2ff' }}>
            <p style={{ margin: 0, color: '#5b35b1' }}>마케팅</p>
            <strong style={{ fontSize: '24px', color: '#5b35b1' }}>{formatNumber(marketingSales)}원</strong>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #a3e4d7' }}>
            <p style={{ margin: 0, color: '#117864' }}>상품</p>
            <strong style={{ fontSize: '24px', color: '#117864' }}>{formatNumber(productSales)}원</strong>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #b7d4ff' }}>
            <p style={{ margin: 0, color: '#1f5fbf' }}>제휴</p>
            <strong style={{ fontSize: '24px', color: '#1f5fbf' }}>{formatNumber(partnershipSales)}원</strong>
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
            {editingId ? '매출 기록 수정' : '새 매출 기록 등록'}
          </h2>

          {editingId && (
            <p style={{ color: '#666', marginTop: '-8px' }}>
              현재 기존 매출 기록을 수정하는 중입니다.
            </p>
          )}

          <div style={{ display: 'grid', gap: '14px' }}>
            <input
              type="date"
              value={salesDate}
              onChange={(e) => setSalesDate(e.target.value)}
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
              placeholder="거래처명 예: 블리스풀, 제주 ○○카페"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SalesCategory)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            >
              <option value="컨설팅">컨설팅</option>
              <option value="마케팅">마케팅</option>
              <option value="상품">상품</option>
              <option value="제">상품</option>
            </select>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="금액"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모 예: 홈페이지 제작 계약금, 마케팅 월 관리비, 커피머신 판매"
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
                {loading ? '처리 중...' : editingId ? '매출 기록 수정 저장' : '매출 기록 저장'}
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
          <h2 style={{ marginTop: 0 }}>등록된 매출 기록</h2>

          {records.length === 0 ? (
            <p style={{ color: '#666' }}>아직 등록된 매출 기록이 없습니다.</p>
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
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '5px 10px',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        ...getCategoryStyle(record.category || '상품')
                      }}
                    >
                      {record.category || '상품'}
                    </span>

                    <strong>{record.clientName}</strong>
                  </div>

                  <p style={{ margin: '10px 0 4px', fontWeight: 'bold' }}>
                    {formatNumber(Number(record.amount || 0))}원
                  </p>

                  <p style={{ margin: '0 0 8px', color: '#666' }}>
                    매출일자: {record.salesDate}
                  </p>

                  {record.memo && (
                    <p style={{ margin: 0, color: '#666', whiteSpace: 'pre-wrap' }}>
                      {record.memo}
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
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

export default SalesLedger;
