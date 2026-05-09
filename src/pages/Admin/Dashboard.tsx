import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#2c3e50' }}>🚀 ARC ADMIN DASHBOARD</h1>
      <p>로그인 성공! 이제 여기에 사장님만의 관리 메뉴를 채우면 됩니다.</p>
      <div style={{ marginTop: '50px', border: '1px solid #ddd', padding: '20px' }}>
        <h3>[ 오늘의 업무 현황 ]</h3>
        <p>환영합니다, 사장님. 현재 시스템 정상 가동 중입니다.</p>
      </div>
    </div>
  );
};

export default Dashboard;
