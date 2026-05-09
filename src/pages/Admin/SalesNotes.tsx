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

type SalesNote = {
  id: string;
  category: string;
  title: string;
  productName: string;
  targetCustomer: string;
  salesPoint: string;
  objectionHandling: string;
  script: string;
  memo: string;
};

const SalesNotes = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState('영업 상품');
  const [title, setTitle] = useState('');
  const [productName, setProductName] = useState('');
  const [targetCustomer, setTargetCustomer] = useState('');
  const [salesPoint, setSalesPoint] = useState('');
  const [objectionHandling, setObjectionHandling] = useState('');
  const [script, setScript] = useState('');
  const [memo, setMemo] = useState('');

  const [notes, setNotes] = useState<SalesNote[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchNotes = async () => {
    const q = query(collection(db, 'salesNotes'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<SalesNote, 'id'>)
    }));

    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const resetForm = () => {
    setCategory('영업 상품');
    setTitle('');
    setProductName('');
    setTargetCustomer('');
    setSalesPoint('');
    setObjectionHandling('');
    setScript('');
    setMemo('');
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!title || !salesPoint) {
      alert('제목과 핵심 영업 포인트는 꼭 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        const noteRef = doc(db, 'salesNotes', editingId);

        await updateDoc(noteRef, {
          category,
          title,
          productName,
          targetCustomer,
          salesPoint,
          objectionHandling,
          script,
          memo,
          updatedAt: serverTimestamp()
        });

        alert('영업 자료가 수정되었습니다.');
      } else {
        await addDoc(collection(db, 'salesNotes'), {
          category,
          title,
          productName,
          targetCustomer,
          salesPoint,
          objectionHandling,
          script,
          memo,
          createdAt: serverTimestamp()
        });

        alert('영업 자료가 저장되었습니다.');
      }

      resetForm();
      await fetchNotes();
    } catch (error) {
      console.error('Sales Note Save Error:', error);
      alert('영업 자료 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (note: SalesNote) => {
    setEditingId(note.id);
    setCategory(note.category || '영업 상품');
    setTitle(note.title || '');
    setProductName(note.productName || '');
    setTargetCustomer(note.targetCustomer || '');
    setSalesPoint(note.salesPoint || '');
    setObjectionHandling(note.objectionHandling || '');
    setScript(note.script || '');
    setMemo(note.memo || '');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('이 영업 자료를 정말 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'salesNotes', id));
      await fetchNotes();
      alert('영업 자료가 삭제되었습니다.');
    } catch (error) {
      console.error('Sales Note Delete Error:', error);
      alert('영업 자료 삭제 중 오류가 발생했습니다.');
    }
  };

  const filteredNotes = notes.filter((note) => {
    const keyword = searchKeyword.toLowerCase();

    return (
      note.title?.toLowerCase().includes(keyword) ||
      note.productName?.toLowerCase().includes(keyword) ||
      note.targetCustomer?.toLowerCase().includes(keyword) ||
      note.salesPoint?.toLowerCase().includes(keyword) ||
      note.category?.toLowerCase().includes(keyword)
    );
  });

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

          <h1 style={{ margin: 0, color: '#222' }}>📚 영업 자료 게시판</h1>
          <p style={{ marginTop: '8px', color: '#666' }}>
            영업 상품, 제안 방법, 고객 응대 스크립트, 반박 대응 멘트를 정리하는 내부 게시판입니다.
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
            {editingId ? '영업 자료 수정' : '새 영업 자료 등록'}
          </h2>

          {editingId && (
            <p style={{ color: '#666', marginTop: '-8px' }}>
              현재 기존 영업 자료를 수정하는 중입니다.
            </p>
          )}

          <div style={{ display: 'grid', gap: '14px' }}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            >
              <option value="영업 상품">영업 상품</option>
              <option value="영업 방법">영업 방법</option>
              <option value="영업 스크립트">영업 스크립트</option>
              <option value="고객 반박 대응">고객 반박 대응</option>
              <option value="가격/견적 안내">가격/견적 안내</option>
              <option value="고객 유형별 전략">고객 유형별 전략</option>
              <option value="기타 메모">기타 메모</option>
            </select>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목 예: 제로스톤 음식물처리기 영업 포인트"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="상품명 예: 제로스톤, 커피머신, 마케팅 컨설팅"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <input
              type="text"
              value={targetCustomer}
              onChange={(e) => setTargetCustomer(e.target.value)}
              placeholder="타깃 고객 예: 신규 카페 창업자, 음식점 대표, 호텔 F&B 담당자"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />

            <textarea
              value={salesPoint}
              onChange={(e) => setSalesPoint(e.target.value)}
              placeholder="핵심 영업 포인트 예: 비용 절감, 합법 처리, 운영 효율, 매출 상승 가능성"
              rows={5}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                resize: 'vertical'
              }}
            />

            <textarea
              value={objectionHandling}
              onChange={(e) => setObjectionHandling(e.target.value)}
              placeholder="고객 반박 대응 예: 비싸다고 할 때, 이미 거래처가 있다고 할 때, 나중에 하겠다고 할 때"
              rows={5}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                resize: 'vertical'
              }}
            />

            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="영업 스크립트 예: 전화 멘트, 카톡 안내문, 방문 상담 멘트"
              rows={5}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                resize: 'vertical'
              }}
            />

            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="추가 메모"
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
                {loading ? '처리 중...' : editingId ? '영업 자료 수정 저장' : '영업 자료 저장'}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ margin: 0 }}>등록된 영업 자료</h2>

            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="검색어 입력"
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                minWidth: '240px'
              }}
            />
          </div>

          {filteredNotes.length === 0 ? (
            <p style={{ color: '#666' }}>등록된 영업 자료가 없습니다.</p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '10px',
                    padding: '18px',
                    backgroundColor: '#fafafa'
                  }}
                >
                  <div style={{ marginBottom: '8px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '999px',
                        backgroundColor: '#333',
                        color: '#fff',
                        fontSize: '12px',
                        marginBottom: '8px'
                      }}
                    >
                      {note.category}
                    </span>
                  </div>

                  <strong style={{ fontSize: '18px' }}>{note.title}</strong>

                  {note.productName && (
                    <p style={{ margin: '8px 0 4px', color: '#555' }}>
                      상품명: {note.productName}
                    </p>
                  )}

                  {note.targetCustomer && (
                    <p style={{ margin: '0 0 10px', color: '#555' }}>
                      타깃 고객: {note.targetCustomer}
                    </p>
                  )}

                  <div style={{ marginTop: '12px' }}>
                    <p style={{ margin: '0 0 4px', fontWeight: 'bold' }}>핵심 영업 포인트</p>
                    <p style={{ margin: 0, color: '#666', whiteSpace: 'pre-wrap' }}>
                      {note.salesPoint}
                    </p>
                  </div>

                  {note.objectionHandling && (
                    <div style={{ marginTop: '12px' }}>
                      <p style={{ margin: '0 0 4px', fontWeight: 'bold' }}>고객 반박 대응</p>
                      <p style={{ margin: 0, color: '#666', whiteSpace: 'pre-wrap' }}>
                        {note.objectionHandling}
                      </p>
                    </div>
                  )}

                  {note.script && (
                    <div style={{ marginTop: '12px' }}>
                      <p style={{ margin: '0 0 4px', fontWeight: 'bold' }}>영업 스크립트</p>
                      <p style={{ margin: 0, color: '#666', whiteSpace: 'pre-wrap' }}>
                        {note.script}
                      </p>
                    </div>
                  )}

                  {note.memo && (
                    <div style={{ marginTop: '12px' }}>
                      <p style={{ margin: '0 0 4px', fontWeight: 'bold' }}>추가 메모</p>
                      <p style={{ margin: 0, color: '#666', whiteSpace: 'pre-wrap' }}>
                        {note.memo}
                      </p>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                    <button
                      onClick={() => handleEdit(note)}
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
                      onClick={() => handleDelete(note.id)}
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

export default SalesNotes;
