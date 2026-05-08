import React from 'react';

const AdminLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">ARC ADMIN</h1>
          <p className="text-gray-500 mt-2 italic">올라운더 커피랩 비즈니스 관제 시스템</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">관리자 인증</label>
            <input 
              type="email" 
              placeholder="admin@allrounder.com" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">보안 암호</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition"
            />
          </div>
          <button className="w-full bg-black text-white p-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg mt-4">
            시스템 엔진 가동
          </button>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} ALLROUNDER COFFEE LAB. Business OS v1.0
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
