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

type EstimateItem = {
  productName: string;
  quantity: number;
  unitPrice: number;
  servicePeriod: string;
  memo: string;
};

type Estimate = {
  id: string;
  estimateNo: string;
  clientName: string;
  managerName: string;
  phone: string;
  estimateDate: string;
  validUntil: string;
  paymentTerms: string;
  items: EstimateItem[];
  note: string;
};

const Estimates = () => {
  const navigate = useNavigate();

  const [estimateNo, setEstimateNo] = useState('');
  const [clientName, setClientName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [phone, setPhone] = useState('');
  const [estimateDate, setEstimateDate] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [note, setNote] = useState('');

  const [items, setItems] = useState<EstimateItem[]>([
    {
  productName: '',
  quantity: 1,
  unitPrice: 0,
  servicePeriod: '',
  memo: ''
}
  ]);

  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchEstimates = async () => {
    const q = query(collection(db, 'estimates'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Estimate, 'id'>)
    }));

    setEstimates(data);
  };

  useEffect(() => {
    fetchEstimates();
  }, []);

  const resetForm = () => {
    setEstimateNo('');
    setClientName('');
    setManagerName('');
    setPhone('');
    setEstimateDate('');
    setValidUntil('');
    setPaymentTerms('');
    setNote('');
    setItems([
      {
  productName: '',
  quantity: 1,
  unitPrice: 0,
  servicePeriod: '',
  memo: ''
}
    ]);
    setEditingId(null);
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString('ko-KR');
  };

  const getTotal = (estimateItems: EstimateItem[]) => {
  return estimateItems.reduce((sum, item) => {
    return sum + Number(item.quantity || 0) * Number(item.unitPrice || 0);
  }, 0);
};

const getSubtotal = (estimateItems: EstimateItem[]) => {
  return Math.round(getTotal(estimateItems) / 1.1);
};

const getVat = (estimateItems: EstimateItem[]) => {
  return getTotal(estimateItems) - getSubtotal(estimateItems);
};

  const handleItemChange = (
    index: number,
    field: keyof EstimateItem,
    value: string
  ) => {
    const newItems = [...items];

    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index] = {
        ...newItems[index],
        [field]: Number(value)
      };
    } else {
      newItems[index] = {
        ...newItems[index],
        [field]: value
      };
    }

    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
  productName: '',
  quantity: 1,
  unitPrice: 0,
  servicePeriod: '',
  memo: ''
}
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) {
      alert('품목은 최소 1개 이상 필요합니다.');
      return;
    }

    const newItems = items.filter((_, itemIndex) => itemIndex !== index);
    setItems(newItems);
  };

  const handleSave = async () => {
    if (!clientName || !estimateDate) {
      alert('거래처명과 견적일자는 꼭 입력해주세요.');
      return;
    }

    const hasEmptyProduct = items.some((item) => !item.productName);

    if (hasEmptyProduct) {
      alert('품목명을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      const estimateData = {
        estimateNo: estimateNo || `EST-${Date.now()}`,
        clientName,
        managerName,
        phone,
        estimateDate,
        validUntil,
        paymentTerms,
        items,
        note
      };

      if (editingId) {
        const estimateRef = doc(db, 'estimates', editingId);

        await updateDoc(estimateRef, {
          ...estimateData,
          updatedAt: serverTimestamp()
        });

        alert('견적서가 수정되었습니다.');
      } else {
        await addDoc(collection(db, 'estimates'), {
          ...estimateData,
          createdAt: serverTimestamp()
        });

        alert('견적서가 저장되었습니다.');
      }

      resetForm();
      await fetchEstimates();
    } catch (error) {
      console.error('Estimate Save Error:', error);
      alert('견적서 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (estimate: Estimate) => {
    setEditingId(estimate.id);
    setEstimateNo(estimate.estimateNo || '');
    setClientName(estimate.clientName || '');
    setManagerName(estimate.managerName || '');
    setPhone(estimate.phone || '');
    setEstimateDate(estimate.estimateDate || '');
    setValidUntil(estimate.validUntil || '');
    setPaymentTerms(estimate.paymentTerms || '');
    setItems(estimate.items || []);
    setNote(estimate.note || '');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('이 견적서를 정말 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'estimates', id));
      await fetchEstimates();
      alert('견적서가 삭제되었습니다.');
    } catch (error) {
      console.error('Estimate Delete Error:', error);
      alert('견적서 삭제 중 오류가 발생했습니다.');
    }
  };

  const handlePrint = (estimate: Estimate) => {
    const subtotal = getSubtotal(estimate.items || []);
    const vat = getVat(estimate.items || []);
    const total = getTotal(estimate.items || []);

    const printWindow = window.open('', '_blank');

    if (!printWindow) {
      alert('팝업이 차단되었습니다. 브라우저 팝업 허용 후 다시 시도해주세요.');
      return;
    }

    const rows = (estimate.items || [])
      .map((item, index) => {
        const amount = Number(item.quantity || 0) * Number(item.unitPrice || 0);

        return `
  <tr>
    <td>${index + 1}</td>
    <td>${item.productName}</td>
    <td>${formatNumber(Number(item.quantity || 0))}</td>
    <td>${formatNumber(Number(item.unitPrice || 0))}원</td>
    <td>${item.servicePeriod || '-'}</td>
    <td>${formatNumber(amount)}원</td>
    <td>${item.memo || ''}</td>
  </tr>
`;
      })
      .join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>견적서 ${estimate.estimateNo}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #222;
            }

            h1 {
              text-align: center;
              margin-bottom: 40px;
              letter-spacing: 8px;
            }

            .top-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
              font-size: 14px;
            }

            .box {
              border: 1px solid #ddd;
              padding: 16px;
              margin-bottom: 20px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }

            th, td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
              font-size: 13px;
            }

            th {
              background: #f3f3f3;
            }

            .total-box {
              margin-top: 24px;
              width: 320px;
              margin-left: auto;
            }

            .total-row {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #eee;
            }

            .grand-total {
              font-size: 20px;
              font-weight: bold;
              margin-top: 10px;
            }

            .note {
              margin-top: 30px;
              white-space: pre-wrap;
              line-height: 1.6;
            }

            .company {
              margin-top: 50px;
              text-align: right;
              font-weight: bold;
            }

            @media print {
              button {
                display: none;
              }
            }
          </style>
        </head>

        <body>
          <button onclick="window.print()" style="padding: 10px 16px; margin-bottom: 20px;">
            PDF로 저장 / 인쇄
          </button>

          <h1>견 적 서</h1>

          <div class="top-info">
            <div>
              <p><strong>견적번호:</strong> ${estimate.estimateNo}</p>
              <p><strong>견적일자:</strong> ${estimate.estimateDate}</p>
              <p><strong>유효기간:</strong> ${estimate.validUntil || '-'}</p>
            </div>

            <div>
              <p><strong>공급자:</strong> 올라운더 커피랩</p>
              <p><strong>담당:</strong> 김유호</p>
            </div>
          </div>

          <div class="box">
            <p><strong>거래처명:</strong> ${estimate.clientName}</p>
            <p><strong>담당자:</strong> ${estimate.managerName || '-'}</p>
            <p><strong>연락처:</strong> ${estimate.phone || '-'}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>품목명</th>
                <th>수량</th>
                <th>세금포함 단가</th>
                <th>서비스기간</th>
                <th>합</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>

          <div class="total-box">
            <div class="total-row">
              <span>공급가액</span>
              <strong>${formatNumber(subtotal)}원</strong>
            </div>
            <div class="total-row">
              <span>부가세</span>
              <strong>${formatNumber(vat)}원</strong>
            </div>
            <div class="total-row grand-total">
              <span>합계</span>
              <strong>${formatNumber(total)}원</strong>
            </div>
          </div>

          <div class="note">
            <p><strong>결제 조건</strong></p>
            <p>${estimate.paymentTerms || '-'}</p>

            <p><strong>특이사항</strong></p>
            <p>${estimate.note || '-'}</p>
          </div>

          <div class="company">
            <p>올라운더 커피랩</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
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

          <h1 style={{ margin: 0, color: '#222' }}>📄 견적서 관리</h1>
          <p style={{ marginTop: '8px', color: '#666' }}>
            거래처별 견적서를 작성하고 PDF로 저장할 수 있습니다.
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
            {editingId ? '견적서 수정' : '새 견적서 작성'}
          </h2>

          {editingId && (
            <p style={{ color: '#666', marginTop: '-8px' }}>
              현재 기존 견적서를 수정하는 중입니다.
            </p>
          )}

          <div style={{ display: 'grid', gap: '14px' }}>
            <input
              type="text"
              value={estimateNo}
              onChange={(e) => setEstimateNo(e.target.value)}
              placeholder="견적번호 비워두면 자동 생성"
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
              placeholder="거래처명"
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
              value={estimateDate}
              onChange={(e) => setEstimateDate(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <input
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <textarea
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              placeholder="결제 조건 예: 계약금 50%, 잔금 설치 완료 후 결제"
              rows={3}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                resize: 'vertical'
              }}
            />

            <div style={{ border: '1px solid #eee', borderRadius: '10px', padding: '16px' }}>
              <h3 style={{ marginTop: 0 }}>견적 품목</h3>

              {items.map((item, index) => (
               <div
  style={{
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1.5fr 2fr auto',
    gap: '8px',
    marginBottom: '8px',
    fontWeight: 'bold',
    fontSize: '13px',
    color: '#555'
  }}
>
  <div>품목명</div>
  <div>수량</div>
  <div>세금포함 단가</div>
  <div>서비스기간</div>
  <div>비고</div>
  <div>삭제</div>
</div>

{items.map((item, index) => (
  <div
    key={index}
    style={{
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1.5fr 2fr auto',
      gap: '8px',
      marginBottom: '10px'
    }}
  >
    <input
      type="text"
      value={item.productName}
      onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
      placeholder="품목명"
      style={{
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}
    />

    <input
      type="number"
      value={item.quantity}
      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
      placeholder="수량"
      style={{
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}
    />

    <input
      type="number"
      value={item.unitPrice}
      onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
      placeholder="세금포함 단가"
      style={{
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}
    />

    <input
      type="text"
      value={item.servicePeriod}
      onChange={(e) => handleItemChange(index, 'servicePeriod', e.target.value)}
      placeholder="예: 1개월, 3개월, 1년"
      style={{
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}
    />

    <input
      type="text"
      value={item.memo}
      onChange={(e) => handleItemChange(index, 'memo', e.target.value)}
      placeholder="비고"
      style={{
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}
    />

    <button
      onClick={() => removeItem(index)}
      style={{
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #e74c3c',
        backgroundColor: '#fff',
        color: '#e74c3c',
        cursor: 'pointer'
      }}
    >
      삭제
    </button>
  </div>
))}
              <button
                onClick={addItem}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #333',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  marginTop: '8px'
                }}
              >
                + 품목 추가
              </button>
            </div>

            <div
              style={{
                backgroundColor: '#fafafa',
                border: '1px solid #eee',
                borderRadius: '10px',
                padding: '16px'
              }}
            >
              <p style={{ margin: '0 0 6px' }}>
                공급가액: <strong>{formatNumber(getSubtotal(items))}원</strong>
              </p>
              <p style={{ margin: '0 0 6px' }}>
                부가세: <strong>{formatNumber(getVat(items))}원</strong>
              </p>
              <p style={{ margin: 0, fontSize: '20px' }}>
                합계: <strong>{formatNumber(getTotal(items))}원</strong>
              </p>
            </div>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="특이사항 예: 설치비 별도, 배송비 포함, 유효기간 이후 금액 변동 가능"
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
                {loading ? '처리 중...' : editingId ? '견적서 수정 저장' : '견적서 저장'}
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
          <h2 style={{ marginTop: 0 }}>등록된 견적서</h2>

          {estimates.length === 0 ? (
            <p style={{ color: '#666' }}>아직 등록된 견적서가 없습니다.</p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {estimates.map((estimate) => (
                <div
                  key={estimate.id}
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '10px',
                    padding: '16px',
                    backgroundColor: '#fafafa'
                  }}
                >
                  <strong>{estimate.estimateNo}</strong>

                  <p style={{ margin: '8px 0 4px', fontWeight: 'bold' }}>
                    {estimate.clientName}
                    {estimate.managerName && ` · ${estimate.managerName}`}
                  </p>

                  <p style={{ margin: '0 0 6px', color: '#666' }}>
                    견적일자: {estimate.estimateDate}
                  </p>

                  <p style={{ margin: '0 0 6px', color: '#666' }}>
                    합계: {formatNumber(getTotal(estimate.items || []))}원
                  </p>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleEdit(estimate)}
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
                      onClick={() => handlePrint(estimate)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #10307D',
                        backgroundColor: '#fff',
                        color: '#10307D',
                        cursor: 'pointer'
                      }}
                    >
                      PDF 저장
                    </button>

                    <button
                      onClick={() => handleDelete(estimate.id)}
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

export default Estimates;
