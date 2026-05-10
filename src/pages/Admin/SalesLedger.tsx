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

  const [themeMode] = useState<AdminThemeMode>(getSavedAdminTheme());
  const theme = getAdminTheme(themeMode);

  const [salesDate, setSalesDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [category, setCategory] = useState<SalesCategory>('상품');
  const [amount, setAmount] = useState<number>(0);
  const [memo, setMemo] = useState('');

  const [records, setRecords] = useState<SalesRecord[]>([]);
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
        backgroundColor: theme.isDark ? '#3a2508' : '#fff5e6',
        color: theme.isDark ? '#fbbf24' : '#b26a00',
        border: theme.isDark ? '1px solid #b26a00' : '1px solid #ffd699'
      };
    }

    if (value === '마케팅') {
      return {
        backgroundColor: theme.isDark ? '#261b4d' : '#f0eaff',
        color: theme.isDark ? '#c4b5fd' : '#5b35b1',
        border: theme.isDark ? '1px solid #7c3aed' : '1px solid #d1c2ff'
      };
    }

    if (value === '제휴') {
      return {
        backgroundColor: theme.isDark ? '#12243f' : '#eaf2ff',
        color: theme.isDark ? '#93c5fd' : '#1f5fbf',
        border: theme.isDark ? '1px solid #2563eb' : '1px solid #b7d4ff'
      };
    }

    return {
      backgroundColor: theme.isDark ? '#123c36' : '#eafaf8',
      color: theme.isDark ? '#5eead4' : '#117864',
      border: theme.isDark ? '1px solid #0f766e' : '1px solid #a3e4d7'
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

  const summaryCardStyle = {
    backgroundColor: theme.cardBg,
    borderRadius: '12px',
    padding: '20px',
    border: `1px solid ${theme.border}`,
    boxShadow: theme.shadow
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

          <h1 style={{ margin: 0, color: theme.text }}>💰 매출 관리</h1>
          <p style={{ marginTop: '8px', color: theme.subText }}>
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
          <div style={summaryCardStyle}>
            <p style={{ margin: 0, color: theme.subText }}>이번 달 매출</p>
            <strong style={{ fontSize: '24px', color: theme.text }}>
              {formatNumber(monthlySales)}원
            </strong>
          </div>

          <div style={summaryCardStyle}>
            <p style={{ margin: 0, color: theme.subText }}>올해 매출</p>
            <strong style={{ fontSize: '24px', color: theme.text }}>
              {formatNumber(yearlySales)}원
            </strong>
          </div>

          <div
            style={{
              ...summaryCardStyle,
              border: theme.isDark ? '1px solid #b26a00' : '1px solid #ffd699'
            }}
          >
            <p style={{ margin: 0, color: theme.isDark ? '#fbbf24' : '#b26a00' }}>컨설팅</p>
            <strong style={{ fontSize: '24px', color: theme.isDark ? '#fbbf24' : '#b26a00' }}>
              {formatNumber(consultingSales)}원
            </strong>
          </div>

          <div
            style={{
              ...summaryCardStyle,
              border: theme.isDark ? '1px solid #7c3aed' : '1px solid #d1c2ff'
            }}
          >
            <p style={{ margin: 0, color: theme.isDark ? '#c4b5fd' : '#5b35b1' }}>마케팅</p>
            <strong style={{ fontSize: '24px', color: theme.isDark ? '#c4b5fd' : '#5b35b1' }}>
              {formatNumber(marketingSales)}원
            </strong>
          </div>

          <div
            style={{
              ...summaryCardStyle,
              border: theme.isDark ? '1px solid #0f766e' : '1px solid #a3e4d7'
            }}
          >
            <p style={{ margin: 0, color: theme.isDark ? '#5eead4' : '#117864' }}>상품</p>
            <strong style={{ fontSize: '24px', color: theme.isDark ? '#5eead4' : '#117864' }}>
              {formatNumber(productSales)}원
            </strong>
          </div>

          <div
            style={{
              ...summaryCardStyle,
              border: theme.isDark ? '1px solid #2563eb' : '1px solid #b7d4ff'
            }}
          >
            <p style={{ margin: 0, color: theme.isDark ? '#93c5fd' : '#1f5fbf' }}>제휴</p>
            <strong style={{ fontSize: '24px', color: theme.isDark ? '#93c5fd' : '#1f5fbf' }}>
              {formatNumber(partnershipSales)}원
            </strong>
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={{ marginTop: 0, color: theme.text }}>
            {editingId ? '매출 기록 수정' : '새 매출 기록 등록'}
          </h2>

          {editingId && (
            <p style={{ color: theme.subText, marginTop: '-8px' }}>
              현재 기존 매출 기록을 수정하는 중입니다.
            </p>
          )}

          <div style={{ display: 'grid', gap: '14px' }}>
            <input
              type="date"
              value={salesDate}
              onChange={(e) => setSalesDate(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="거래처명 예: 블리스풀, 제주 ○○카페"
              style={inputStyle}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SalesCategory)}
              style={inputStyle}
            >
              <option value="컨설팅">컨설팅</option>
              <option value="마케팅">마케팅</option>
              <option value="상품">상품</option>
              <option value="제휴">제휴</option>
            </select>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="금액"
              style={inputStyle}
            />

            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모 예: 홈페이지 제작 착수금, 마케팅 월 관리비, 커피머신 판매, 상품 연결 수수료"
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
                {loading ? '처리 중...' : editingId ? '매출 기록 수정 저장' : '매출 기록 저장'}
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
          <h2 style={{ marginTop: 0, color: theme.text }}>등록된 매출 기록</h2>

          {records.length === 0 ? (
            <p style={{ color: theme.subText }}>아직 등록된 매출 기록이 없습니다.</p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {records.map((record) => {
                const recordCategory = record.category || '상품';

                return (
                  <div
                    key={record.id}
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
                          ...getCategoryStyle(recordCategory)
                        }}
                      >
                        {recordCategory}
                      </span>

                      <strong style={{ color: theme.text }}>{record.clientName}</strong>
                    </div>

                    <p style={{ margin: '10px 0 4px', fontWeight: 'bold', color: theme.text }}>
                      {formatNumber(Number(record.amount || 0))}원
                    </p>

                    <p style={{ margin: '0 0 8px', color: theme.subText }}>
                      매출일자: {record.salesDate}
                    </p>

                    {record.memo && (
                      <p style={{ margin: 0, color: theme.subText, whiteSpace: 'pre-wrap' }}>
                        {record.memo}
                      </p>
                    )}

                    <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleEdit(record)}
                        style={outlineButtonStyle}
                      >
                        수정
                      </button>

                      <button
                        onClick={() => handleDelete(record.id)}
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
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesLedger;
