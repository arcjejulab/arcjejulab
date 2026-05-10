/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  motion, AnimatePresence 
} from 'motion/react';
import { 
  Cpu, Layout, Smartphone, Zap, Search, Users, 
  ArrowRight, Paintbrush, ShieldCheck, Coffee, 
  X, CheckCircle2, BarChart3, Globe, Plus, 
  Newspaper, Bell, Camera, Layers, Sun, Moon,
  ClipboardList, Target, TrendingUp, Settings,
  FlaskConical, Compass, Heart, Sprout
} from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import Schedule from './pages/Admin/Schedule';
import Clients from './pages/Admin/Clients';
import ProtectedRoute from './pages/Admin/ProtectedRoute';
import SalesNotes from './pages/Admin/SalesNotes';
import Estimates from './pages/Admin/Estimates';

import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, BarChart, Bar, Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell
} from 'recharts';

// --- Logic & Data ---

const ArcLogo = ({ isDark = false }: { isDark?: boolean }) => (
  <button 
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="focus:outline-none transition-all hover:scale-105 active:scale-95 flex items-center justify-center p-2"
  >
    <div className="relative h-10 md:h-12 w-20 flex items-center justify-center">
      {/* Organic Blob Background */}
      <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full drop-shadow-sm">
        <path 
          d="M15,30 C15,10 40,5 65,10 C85,15 90,30 85,45 C80,60 50,55 30,50 C10,45 15,40 15,30 Z" 
          fill={isDark ? "white" : "#10307D"} 
        />
        <text 
          x="48" 
          y="38" 
          textAnchor="middle" 
          fill={isDark ? "#0f1118" : "white"} 
          className="text-[22px] font-black tracking-tighter"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          ARC
        </text>
      </svg>
      {/* LAB Text outside the blob */}
      <span 
        className={`absolute -bottom-1 -right-1 text-[10px] font-black uppercase tracking-tighter ${
          isDark ? 'text-white' : 'text-[#10307D]'
        }`}
      >
        LAB
      </span>
    </div>
  </button>
);

// --- Components ---

const Header = ({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean; toggleDarkMode: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`w-full h-20 px-6 md:px-12 flex items-center justify-between sticky top-0 z-[100] transition-all duration-300 ${
      isScrolled 
        ? (isDarkMode ? 'bg-[#0f1118]/90 shadow-lg py-2' : 'bg-[#EBEBEB]/90 shadow-sm py-2') 
        : 'py-4'
    } backdrop-blur-md`}>
      <div className="flex items-center gap-8">
        <ArcLogo isDark={isDarkMode} />
        <div className="hidden md:flex gap-8">
          {[
            { id: 'news', label: '소식' },
            { id: 'values', label: '가치' },
            { id: 'strategy', label: '포트폴리오' },
            { id: 'technology', label: '솔루션' },
            { id: 'teams', label: '팀' }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm font-bold transition-colors ${
                isDarkMode ? 'text-white/60 hover:text-white' : 'text-[#10307D]/60 hover:text-[#10307D]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleDarkMode}
          className={`p-2.5 rounded-full transition-all hover:scale-110 active:scale-90 ${
            isDarkMode ? 'bg-white/10 text-yellow-400' : 'bg-[#10307D]/5 text-[#10307D]'
          }`}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className={`px-6 py-2.5 rounded-full text-[12px] font-black tracking-widest uppercase hover:scale-105 active:scale-95 transition-all ${
          isDarkMode ? 'bg-white text-[#0f1118]' : 'bg-[#10307D] text-white'
        }`}>
          Contact
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [selectedFeature, setSelectedFeature] = useState<null | any>(null);

  const heroFeatures = [
    { 
      id: "branding",
      tag: "AUTHENTICITY", 
      label: "진정성", 
      desc: "기계적 메커니즘 분석으로 브랜드의 대체 불가능한 본질을 도출합니다.",
      detailDesc: "감에 의존하는 디자인은 힘이 없습니다. 고객의 무의식 속 자극 요소를 엔지니어링 관점에서 분해하고 재조립합니다. 화려한 미사여구가 아닌, 기하학적 정렬과 데이터 분석으로 증명된 브랜드 아이덴티티를 구축합니다.",
      analysis: "감성 기반 브랜딩 대비 논리 기반 브랜딩의 고객 충성도(LTV)는 지속력이 2.8배 높습니다.",
      solution: "고객 경험의 모든 접점을 '브랜드 로직'으로 동기화하여, 사장님께 브랜드에 대한 확고한 자부심과 시장 내 권위를 선사합니다.",
      chartType: "radar",
      chartData: [
        { subject: '논리적 일관성', A: 40, B: 140, fullMark: 150 },
        { subject: '본질 점유율', A: 50, B: 130, fullMark: 150 },
        { subject: '경험 동기화', A: 60, B: 145, fullMark: 150 },
        { subject: '메커니즘 강도', A: 30, B: 135, fullMark: 150 },
        { subject: '시장 권위', A: 45, B: 140, fullMark: 150 },
      ],
      detailImg: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=1000",
      bg: "bg-[#1a1e29]",
      icon: <Layers className="w-8 h-8" />
    },
    { 
      id: "management",
      tag: "SELF-SUSTAINABILITY", 
      label: "자생력", 
      desc: "낮은 진입장벽을 넘어서는 생존 전략, 흔들리지 않는 경영을 위한 SOP 시스템을 구축합니다.",
      detailDesc: "누구나 시작할 수 있지만 아무나 살아남을 수는 없는 카페 시장. 시스템 없는 막연한 노동을 걷어내고, 데이터로 설계된 정교한 SOP를 이식합니다. 시스템이 운영의 중심을 잡을 때, 사장님의 진심은 비로소 지속 가능한 비즈니스가 됩니다.",
      analysis: "체계 없는 운영은 확장이 아닌 소모일 뿐입니다. 시스템의 개입률이 낮고 사장님의 직관에만 의존할수록, 비즈니스의 생존율은 급격히 하락합니다.",
      solution: "단순한 자동화를 넘어, 본질에 집중할 수 있는 SOP 기반의 운영 체계를 구축하여 사장님께 '지속 가능한 경영의 확신'과 심리적 안도감을 제공합니다.",
      chartType: "area",
      chartData: [
        { name: '1주', owner: 90, system: 10 },
        { name: '4주', owner: 60, system: 40 },
        { name: '8주', owner: 20, system: 80 },
        { name: '12주', owner: 5, system: 95 },
      ],
      detailImg: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=1000",
      bg: "bg-[#10307D]",
      icon: <Cpu className="w-8 h-8" />
    },
    { 
      id: "marketing",
      tag: "TREND TECH", 
      label: "트랜드", 
      desc: "AI가 당신의 브랜드를 '지역의 유일한 정답'으로 학습하게 합니다.",
      detailDesc: "더 이상 SNS의 허수인 수치에 매몰되지 마십시오. Perplexity, ChatGPT, Gemini와 같은 AI 엔진이 추천의 근거로 삼는 '지식 그래프' 데이터 구조를 설계합니다. 검색 결과의 상단이 아닌, AI 답변의 '주어'를 점유하는 기술입니다.",
      analysis: "전통적 키워드 광고 효율 대비 AI 추천 엔진을 통한 전환 가치가 4.2배 높게 측정됩니다.",
      solution: "데이터 피딩 시스템을 통해 AI 모델이 브랜드를 신뢰할 수 있는 정보로 인지하게 하여, 사장님께 압도적인 시장 점유의 쾌감을 제공합니다.",
      chartType: "bar",
      chartData: [
        { name: 'SNS 홍보', value: 15 },
        { name: '단순 검색', value: 20 },
        { name: 'AI 추천', value: 75 },
      ],
      detailImg: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1000",
      bg: "bg-[#007AFF]",
      icon: <Target className="w-8 h-8" />
    }
  ];

  return (
    <section className={`min-h-[90vh] px-6 md:px-12 py-12 md:py-20 flex flex-col items-center transition-colors duration-500 ${isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'}`}>
      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-10 gap-12">
        
        <div className="lg:col-span-7 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase ${
              isDarkMode ? 'bg-white/10 text-white' : 'bg-[#10307D]/5 text-[#10307D]'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isDarkMode ? 'bg-white' : 'bg-[#10307D]'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  isDarkMode ? 'bg-white' : 'bg-[#10307D]'
                }`}></span>
              </span>
              Strategy First Branding
            </div>
            <h1 className={`text-4xl md:text-7xl font-black leading-[1.05] tracking-tight break-keep ${
              isDarkMode ? 'text-white' : 'text-[#10307D]'
            }`}>
              열심히는 누구나.<br/>
              제대로는 시스템이.<br/>
              <span className="inline-block px-2 md:px-4 mt-2 text-white bg-[#10307D] text-[1.45rem] xs:text-[1.8rem] sm:text-4xl md:text-7xl whitespace-nowrap tracking-tighter">본질에만 집중하는 구조.</span>
            </h1>
            <p className={`text-xl font-light leading-relaxed max-w-3xl break-keep ${
              isDarkMode ? 'text-white/60' : 'text-gray-500'
            }`}>
              감이 아닌 로직으로, 운이 아닌 시스템으로 증명합니다.<br/>
              승리하는 브랜딩 전략과 스스로 작동하는 경영 시스템으로 카페의 지속 가능성을 구축합니다.
            </p>
          </motion.div>

          <div className={`w-full h-[400px] rounded-[3rem] shadow-2xl overflow-hidden relative group transition-colors ${
            isDarkMode ? 'bg-white/5 shadow-white/5 border border-white/10' : 'bg-white shadow-[#10307D]/10'
          }`}>
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000" 
              alt="Spatial Design & Branding" 
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ${
                isDarkMode ? 'grayscale-[60%] opacity-40' : 'grayscale-0 opacity-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-12">
              <div className="text-white">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-70">Spatial Consulting</span>
                <h3 className="text-2xl font-bold">All Rounder Coffee Lab</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {heroFeatures.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedFeature(item)}
                className={`p-6 rounded-3xl transition-all cursor-pointer group border flex flex-col justify-between aspect-square md:aspect-auto min-h-[140px] ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 hover:border-white/30' 
                    : 'bg-white border-[#10307D]/10 hover:border-[#10307D]/30 shadow-sm hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-[8px] font-bold tracking-widest uppercase block ${
                    isDarkMode ? 'text-white/40' : 'text-[#10307D]'
                  }`}>{item.tag}</span>
                  <motion.div 
                    animate={{ 
                      rotate: item.id === 'management' ? 360 : 0,
                      scale: item.id === 'marketing' ? [1, 1.2, 1] : 1,
                      y: item.id === 'strategy' ? [0, -4, 0] : 0,
                      opacity: item.id === 'branding' ? [0.5, 1, 0.5] : 1
                    }}
                    transition={{ 
                      duration: item.id === 'management' ? 8 : 2, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className={`p-2 rounded-xl ${isDarkMode ? 'bg-white/5 text-white/40' : 'bg-[#10307D]/5 text-[#10307D]/40'}`}
                  >
                    {React.cloneElement(item.icon as React.ReactElement, { size: 16 })}
                  </motion.div>
                </div>
                <div>
                  <div className={`text-[13px] font-black mb-1 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {item.label}
                  </div>
                </div>
                <div className={`flex items-center justify-end ${
                  isDarkMode ? 'text-white/40' : 'text-[#10307D]/40'
                }`}>
                  <ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div id="news" className="lg:col-span-3 space-y-8">
          <div className={`rounded-[2.5rem] p-8 border h-full transition-colors ${
            isDarkMode 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white border-[#10307D]/10'
          }`}>
            <div className="flex items-center justify-between mb-10">
              <h4 className={`text-sm font-black tracking-tighter flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-[#10307D]'
              }`}>
                <Bell className="w-4 h-4" /> ARC 소식
              </h4>
              <button className={`p-2 rounded-full transition-colors ${
                isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-[#EBEBEB] text-[#10307D]'
              }`}>
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className={`w-full aspect-[4/5] rounded-3xl mb-10 overflow-hidden relative group cursor-pointer ${
              isDarkMode ? 'bg-white/10' : 'bg-[#10307D]'
            }`}>
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-10 text-white">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[8px] font-bold mb-4 w-fit tracking-widest uppercase">Special</span>
                <h5 className="text-xl font-bold leading-tight mb-2">사장님 없는 가게,<br/>지능형 시스템 무료 진단</h5>
                <p className="text-[10px] opacity-60">Jeju Business Pivot Plan</p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1522071823991-b9671f903f7f?auto=format&fit=crop&q=80&w=800" 
                alt="Promotion"
                className={`w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 ${
                  isDarkMode ? 'grayscale saturate-0' : ''
                }`} 
              />
            </div>

            <div className="space-y-8">
              <h6 className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Newspaper className="w-3 h-3" /> News Feed
              </h6>
              <div className="space-y-4">
                {[
                  "AEO 알고리즘 2026 동향 분석",
                  "제주 스마트 플레이스 랭킹 전략",
                  "올라운더 커피 랩 OEM 납품처 확대"
                ].map((news, i) => (
                  <div key={i} className="group cursor-pointer">
                    <p className={`text-[13px] font-medium group-hover:underline underline-offset-4 ${
                      isDarkMode ? 'text-white/80 decoration-white/30' : 'text-[#10307D] decoration-[#10307D]/30'
                    }`}>{news}</p>
                    <span className="text-[10px] text-gray-400">2026.04.25</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedFeature && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className={`relative z-10 w-full max-w-4xl p-0 rounded-[3rem] overflow-hidden flex flex-col md:flex-row ${
                isDarkMode ? 'bg-[#1a1e29] border border-white/10 shadow-2xl' : 'bg-white shadow-2xl'
              }`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-[#0f1118]">
                <img 
                  src={selectedFeature.detailImg} 
                  alt={selectedFeature.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10">
                  <span className="text-[10px] font-black tracking-widest text-white/50 uppercase mb-2">Protocol Materialization</span>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${selectedFeature.bg} shadow-lg shadow-black/20`}>
                    {selectedFeature.icon}
                  </div>
                  <h3 className="text-4xl font-black text-white leading-tight">{selectedFeature.label}</h3>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[70vh] md:max-h-[85vh]">
                <button 
                  onClick={() => setSelectedFeature(null)}
                  className={`absolute top-6 right-6 p-3 rounded-full z-20 transition-colors ${
                    isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/5 hover:bg-black/10 text-[#10307D]'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-10">
                  <div>
                    <span className={`text-[10px] font-black tracking-[0.3em] uppercase mb-4 block ${
                      isDarkMode ? 'text-white/40' : 'text-gray-400'
                    }`}>Diagnosis Report: {selectedFeature.tag}</span>
                    
                    <h4 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>정밀 진단 결과</h4>
                    <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      {selectedFeature.detailDesc}
                    </p>

                    <div className={`p-6 rounded-3xl mb-8 ${
                      isDarkMode ? 'bg-white/5' : 'bg-gray-50 border border-gray-100'
                    }`}>
                      <h5 className={`text-[10px] font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>System Data Visualization</h5>
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          {selectedFeature.chartType === 'area' ? (
                            <AreaChart data={selectedFeature.chartData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#ffffff10" : "#00000010"} />
                              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                              <YAxis hide />
                              <Tooltip 
                                contentStyle={{ backgroundColor: isDarkMode ? '#1a1e29' : '#fff', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                              />
                              <Area type="monotone" dataKey="owner" stroke="#FF5D5D" fillOpacity={0.1} fill="#FF5D5D" strokeWidth={2} name="사장 노동" />
                              <Area type="monotone" dataKey="system" stroke="#007AFF" fillOpacity={0.2} fill="#007AFF" strokeWidth={2} name="시스템 운영" />
                            </AreaChart>
                          ) : selectedFeature.chartType === 'bar' ? (
                            <BarChart data={selectedFeature.chartData}>
                              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                              <YAxis hide />
                              <Tooltip 
                                contentStyle={{ backgroundColor: isDarkMode ? '#1a1e29' : '#fff', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                              />
                              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                                {selectedFeature.chartData.map((_entry: any, index: number) => (
                                  <Cell key={`cell-${index}`} fill={index === 2 ? '#007AFF' : '#10307D30'} />
                                ))}
                              </Bar>
                            </BarChart>
                          ) : selectedFeature.chartType === 'radar' ? (
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={selectedFeature.chartData}>
                              <PolarGrid stroke={isDarkMode ? "#ffffff10" : "#00000010"} />
                              <PolarAngleAxis dataKey="subject" fontSize={8} />
                              <Radar name="Before" dataKey="A" stroke="#10307D30" fill="#10307D10" fillOpacity={0.6} />
                              <Radar name="After All-Rounder" dataKey="B" stroke="#007AFF" fill="#007AFF" fillOpacity={0.4} />
                            </RadarChart>
                          ) : (
                            <PieChart>
                              <Pie
                                data={selectedFeature.chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {selectedFeature.chartData.map((_entry: any, index: number) => (
                                  <Cell key={`cell-${index}`} fill={['#FF5D5D', '#10307D30', '#007AFF'][index]} />
                                ))}
                              </Pie>
                              <Tooltip 
                                contentStyle={{ backgroundColor: isDarkMode ? '#1a1e29' : '#fff', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                              />
                            </PieChart>
                          )}
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h5 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-[#FF5D5D]' : 'text-[#FF5D5D]'}`}>Core Issue Analysis</h5>
                        <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{selectedFeature.analysis}</p>
                      </div>
                      <div>
                        <h5 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-[#007AFF]' : 'text-[#007AFF]'}`}>Algorithm Proposal</h5>
                        <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{selectedFeature.solution}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-gray-100/10 flex gap-4">
                    <button 
                      onClick={() => setSelectedFeature(null)}
                      className="flex-1 py-4 bg-[#10307D] text-white rounded-2xl font-black text-xs tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#10307D]/20"
                    >
                      상담 알고리즘 가동
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const CoreValues = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const values = [
    {
      topic: "진정성",
      basis: "단순한 감성이 아닌 체크포인트 데이터 모델링과 엔지니어링 분석으로 브랜드의 본질(Origin)을 추출합니다.",
      emotion: "가짜가 판치는 시장에서 '진짜'로 인정받는 사장님의 자부심을 데이터로 완성합니다.",
      icon: <Heart className="w-12 h-12" />
    },
    {
      topic: "자생력",
      basis: "스스로 작동하고 성장하는 지능형 SOP(표준 운영 절차) 시스템을 구축합니다.",
      emotion: "24시간 멈추지 않는 지능형 엔진이 실무를 책임집니다. 이제 현장의 '일'이 아닌, 사업의 '결'을 관리하는 본질적인 경영에만 집중하십시오.",
      icon: <Sprout className="w-12 h-12" />
    },
    {
      topic: "트랜드",
      basis: "단순 노출을 넘어 AI 엔진(AEO/GEO)이 브랜드를 지역 내 최우선 정답으로 학습하게 하는 시맨틱 데이터 피딩.",
      emotion: "광고비에 쫓기지 않고도 고객이 알아서 찾아오는 시장 점유의 쾌감을 선사합니다.",
      icon: <TrendingUp className="w-12 h-12" />
    }
  ];

  return (
    <section id="values" className={`py-32 px-6 md:px-12 transition-colors duration-500 ${isDarkMode ? 'bg-[#1a1e29]' : 'bg-white'}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24 space-y-4">
          <span className={`text-[10px] font-black tracking-[0.5em] uppercase ${isDarkMode ? 'text-blue-400' : 'text-[#007AFF]'}`}>Core Framework</span>
          <h2 className={`text-4xl md:text-6xl font-black break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>올라운더의 핵심 가치</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {values.map((v, i) => (
            <div key={i} className="group relative">
              <div className="absolute -top-10 -left-10 text-[120px] font-black opacity-[0.03] select-none pointer-events-none">0{i+1}</div>
              <div className={`mb-12 w-24 h-24 rounded-3.5xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden ${
                isDarkMode ? 'bg-white/5 text-white' : 'bg-[#10307D]/5 text-[#10307D]'
              }`}>
                <div className="absolute inset-0 opacity-10 flex items-center justify-center scale-150 rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-transform duration-700 md:hidden">
                  {v.icon}
                </div>
                <div className="relative z-10">
                  {v.icon}
                </div>
              </div>
              <div className="space-y-8 relative">
                <div>
                  <h4 className={`text-[10px] font-black mb-3 flex items-center gap-3 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`}>
                    <div className="w-5 h-[1px] bg-current" /> TOPIC
                  </h4>
                  <h3 className={`text-3xl font-black break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{v.topic}</h3>
                </div>
                <div>
                  <h4 className={`text-[10px] font-black mb-3 flex items-center gap-3 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`}>
                    <div className="w-5 h-[1px] bg-current" /> LOGICAL BASIS
                  </h4>
                  <p className={`text-[15px] leading-relaxed font-medium break-keep ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>{v.basis}</p>
                </div>
                <div>
                  <h4 className={`text-[10px] font-black mb-3 flex items-center gap-3 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`}>
                    <div className="w-5 h-[1px] bg-current" /> EMOTION
                  </h4>
                  <p className={`text-[15px] leading-relaxed italic border-l-2 pl-6 break-keep ${isDarkMode ? 'text-white/80 border-blue-500' : 'text-[#10307D] border-[#10307D]/20'}`}>{v.emotion}</p>
                </div>
                <div className="pt-6">
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [selectedProject, setSelectedProject] = useState<null | any>(null);

  const portfolioItems = [
    {
      id: "authenticity-blueprint",
      title: "진정한 브랜드 로직",
      tags: ["#Branding", "#Logic"],
      summary: [
        "Topic: 진정성 강화. 체크포인트 기반 브랜드 본질 추출.",
        "Logical Basis: 감각이 아닌 데이터로 증명된 아이덴티티 설계.",
        "Emotion: 가짜가 아닌 '진짜' 브랜드로 인정받는 경영자의 자부심."
      ],
      details: {
        analysis: "시장 내 유사 브랜드 분석 및 고유 메커니즘 추출도.",
        process: "엔지니어링 관점의 시각 언어(SI) 설계 및 무의식 자극 요소 배치.",
        deployment: "전 접점 브랜드 로직 동기화 및 가이드라인 배포.",
        chartType: "radar",
        chartData: [
          { subject: '논리성', A: 40, B: 140 },
          { subject: '일관성', A: 50, B: 130 },
          { subject: '차별성', A: 30, B: 145 },
          { subject: '경험력', A: 45, B: 135 },
          { subject: '본질강도', A: 35, B: 140 },
        ]
      },
      img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80&w=1000",
      stats: "LTV 2.8x"
    },
    {
      id: "business-os",
      title: "비즈니스 OS",
      tags: ["#Automation", "#System"],
      summary: [
        "Topic: 지속 가능한 자생력. 컨설팅 이후에도 스스로 진화하고 성장하는 시스템.",
        "Logical Basis: 시스템 기반의 구조 설계 및 실무에 완전히 내재화되는 최적화 SOP.",
        "Emotion: 원칙과 시스템이 작동하는 구조에서 얻는 지속 성장의 확신."
      ],
      details: {
        analysis: "비즈니스 구조의 근본적 병목 진단 및 자생적 성장 지표 분석.",
        process: "컨설팅의 가치가 영구히 지속되는 자가 진화형 SOP 설계.",
        deployment: "전문 지식과 경험이 내재화된 운영 체제 구축, 선순환 구조로 전환.",
        chartType: "line",
        chartData: [
          { name: '1주', error: 90, skill: 10 },
          { name: '4주', error: 60, skill: 40 },
          { name: '8주', error: 20, skill: 80 },
          { name: '12주', error: 5, skill: 95 },
        ]
      },
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
      stats: "Labor -95%"
    },
    {
      id: "aeo-blueprint",
      title: "AEO/GEO/SEO (AI 최적화)",
      tags: ["#AEO_GEO", "#시맨틱_데이터"],
      summary: [
        "Topic: 트랜드 점유. AI 알고리즘이 선호하는 시맨틱 데이터 구조화.",
        "Logical Basis: 검색 결과가 아닌 '답변'을 점유하는 LLM 기반 최적화 엔진.",
        "Emotion: 광고비 없이도 고객의 질문에 우리 브랜드가 답변으로 나오는 희열."
      ],
      details: {
        analysis: "주요 키워드별 AI 답변 점유율 및 지식 그래프 연결도 측정.",
        process: "브랜드 관련 비정형 데이터를 시맨틱 구조로 재가공하여 검색 엔진 및 AI 모델에 피딩.",
        deployment: "ChatGPT, Gemini, Perplexity 등 주요 AI 엔진에 최적화된 브랜드 데이터 배포.",
        chartType: "line",
        chartData: [
          { name: '1주', error: 60, skill: 10 },
          { name: '4주', error: 40, skill: 45 },
          { name: '8주', error: 15, skill: 75 },
          { name: '12주', error: 5, skill: 92 },
        ]
      },
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
      stats: "ROAS 450%"
    }
  ];

  return (
    <section id="strategy" className={`py-32 px-6 md:px-12 transition-colors duration-500 overflow-hidden ${isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <span className={`text-[10px] font-bold tracking-[0.4em] uppercase ${
              isDarkMode ? 'text-white/40' : 'text-[#10307D]'
            }`}>Impact & Trajectory</span>
            <h2 className={`text-4xl md:text-6xl font-black leading-tight break-keep ${
              isDarkMode ? 'text-white' : 'text-[#10307D]'
            }`}>
              성공의 궤적,<br/>포트폴리오.
            </h2>
          </div>
          <p className={`max-w-md text-sm font-medium leading-relaxed break-keep ${
            isDarkMode ? 'text-white/50' : 'text-gray-500'
          }`}>
            우리는 단순히 예쁜 결과물을 만들지 않습니다. 실제 매출 상승과 운영 효율화라는 명확한 지표를 통해 비즈니스의 생명력을 입증합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioItems.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(item)}
              className={`rounded-[3rem] overflow-hidden flex flex-col group cursor-pointer border ${
                isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#10307D]/5'
              }`}
            >
              <div className="relative h-[240px] overflow-hidden">
                <img 
                  src={item.img} 
                  className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${
                    isDarkMode ? 'grayscale-[80%] opacity-40' : 'grayscale-0 opacity-100'
                  }`} 
                  alt={item.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <div className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-black text-white border border-white/20 uppercase tracking-widest">
                    {item.stats}
                  </div>
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-1">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {item.tags.map(tag => (
                    <span key={tag} className={`text-[10px] font-bold ${isDarkMode ? 'text-blue-400' : 'text-[#007AFF]'}`}>{tag}</span>
                  ))}
                </div>
                <h3 className={`text-xl font-bold mb-6 leading-tight ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
                  {item.title}
                </h3>
                <div className="space-y-3 mb-8 flex-1">
                  {item.summary.map((line, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className={`w-1 h-1 rounded-full mt-2 shrink-0 ${isDarkMode ? 'bg-white/30' : 'bg-[#10307D]/20'}`} />
                      <p className={`text-[12px] leading-relaxed ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{line}</p>
                    </div>
                  ))}
                </div>
                <div 
                  className={`w-full py-4 rounded-xl text-center text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-white/10 text-white group-hover:bg-white group-hover:text-black' 
                    : 'bg-[#10307D]/5 text-[#10307D] group-hover:bg-[#10307D] group-hover:text-white'
                }`}>
                  상세 시뮬레이션 분석
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div 
              layoutId={selectedProject.id}
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl relative z-10 ${
                isDarkMode ? 'bg-[#1a1e29] border border-white/10' : 'bg-white'
              }`}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className={`absolute top-8 right-8 p-3 rounded-full transition-colors z-20 ${
                  isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-400'
                }`}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col lg:flex-row h-full">
                <div className="lg:w-1/2 relative h-[300px] lg:h-auto">
                  <img 
                    src={selectedProject.img} 
                    className="w-full h-full object-cover" 
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 lg:from-transparent to-transparent flex items-end p-12">
                    <div className="bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20">
                      <span className="text-white font-black text-xl">{selectedProject.stats}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-8 md:p-16">
                  <div className={`text-[10px] font-black tracking-widest mb-4 ${isDarkMode ? 'text-blue-400' : 'text-[#007AFF]'}`}>
                    SIMULATION REPORT / {selectedProject.stats}
                  </div>
                  <h3 className={`text-3xl font-black mb-8 leading-tight ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
                    {selectedProject.title}
                  </h3>
                  
                  <div className={`p-8 rounded-[2.5rem] mb-10 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <h4 className={`text-[10px] font-black uppercase tracking-widest mb-6 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`}>Process Data Visualization</h4>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        {selectedProject.details.chartType === 'line' ? (
                          <AreaChart data={selectedProject.details.chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#ffffff10" : "#00000010"} />
                            <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis hide />
                            <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1a1e29' : '#fff', border: 'none', borderRadius: '12px' }} />
                            <Area type="monotone" dataKey="error" stroke="#FF5D5D" fillOpacity={0.1} fill="#FF5D5D" strokeWidth={2} name="오점 발생률" />
                            <Area type="monotone" dataKey="skill" stroke="#007AFF" fillOpacity={0.2} fill="#007AFF" strokeWidth={2} name="운영 숙련도" />
                          </AreaChart>
                        ) : (
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={selectedProject.details.chartData}>
                            <PolarGrid stroke={isDarkMode ? "#ffffff10" : "#00000010"} />
                            <PolarAngleAxis dataKey="subject" fontSize={8} />
                            <Radar name="Before" dataKey="A" stroke="#10307D30" fill="#10307D10" fillOpacity={0.6} />
                            <Radar name="After All-Rounder" dataKey="B" stroke="#007AFF" fill="#007AFF" fillOpacity={0.4} />
                          </RadarChart>
                        )}
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Analysis</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>{selectedProject.details.analysis}</p>
                      </div>
                      <div>
                        <h4 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Process</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>{selectedProject.details.process}</p>
                      </div>
                      <div>
                        <h4 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Deployment</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>{selectedProject.details.deployment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Solutions = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [selectedTech, setSelectedTech] = useState<null | string>(null);

  const services = [
    {
      id: "brand",
      title: "브랜딩",
      desc: "감성이 아닌 데이터로 추출한 브랜드의 본질을 설계합니다.",
      icon: <Paintbrush className="w-8 h-8 text-[#FF5D5D]" />,
      bg: isDarkMode ? "bg-[#FF5D5D]/10" : "bg-[#FFF0F0]",
      topic: "진정성 (Authenticity) 강화",
      logicalBasis: "컬러리스트와 기획자가 브랜드의 물리적 지성(Logical Intellect)을 추출합니다. 단순히 시각적 아름다움을 넘어, 브랜드가 시장에서 가져야 할 고유의 메커니즘을 정의하여 대체 불가능한 권위를 구축합니다.",
      emotion: "'가짜'가 아닌 '진짜' 브랜드의 주인이 되었다는 자부심과 시장을 선도하는 경영자로서의 확신을 드립니다.",
      features: ["지능형 브랜드 메커니즘 추출", "시맨틱 아이덴티티(SI) 가이드", "무의식 자극 경험 설계"],
      logos: [
        { name: "BrandLogic", url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Adobe_Experience_Design_logo.svg" },
        { name: "VisualSystem", url: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg" }
      ]
    },
    {
      id: "space",
      title: "공간 설계",
      desc: "브랜드의 철학이 머무는 공간, 감각적인 시공과 동선 로직.",
      icon: <Layers className="w-8 h-8 text-[#7C3AED]" />,
      bg: isDarkMode ? "bg-[#7C3AED]/10" : "bg-[#F5F3FF]",
      topic: "진정성 (Authenticity) 경험화",
      logicalBasis: "고객의 시각 자극과 이동 패턴을 동선 효율 알고리즘으로 분석하여 결제에서 픽업까지의 병목 현상을 0%로 설계합니다. 공간 자체가 브랜드의 언어가 되는 BX 설계입니다.",
      emotion: "고객이 감탄하며 사진을 찍고 다시 방문하고 싶어하는 공간을 소유한다는 자부심과 시장 내 압도적 권위를 구축합니다.",
      features: ["브랜드 중심 로직 설계", "동선 효율성 알고리즘", "고정밀 시공 가이드라인"],
      logos: [
        { name: "InteriorSystem", url: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_Blueprint_Icon.svg" },
        { name: "BXEngineering", url: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Icon_Design_Home.svg" }
      ]
    },
    {
      id: "place",
      title: "플랫폼",
      desc: "데이터와 알고리즘이 선호하는 맥락을 설계하여 압도적 점유율을 만듭니다.",
      icon: <Search className="w-8 h-8 text-[#00C73C]" />,
      bg: isDarkMode ? "bg-[#00C73C]/10" : "bg-[#F0FFF4]",
      topic: "자생력 (Self-sustainability) 최적화",
      logicalBasis: "네이버, 구글의 플레이스 로직을 데이터 마이닝 기법으로 분석하여 타겟 키워드와 상권 상호작용을 정밀 매칭합니다. 단순 노출이 아닌 '정답률'을 높이는 전략입니다.",
      emotion: "모객에 대한 불확실성을 데이터로 제거하고, 매일 랭킹되는 상위 리스트를 확인하며 얻는 사업적 희열을 드립니다.",
      features: ["플랫폼별 정밀 SOP 적용", "상권 맞춤 키워드 자동화", "텍스트 마이닝 리뷰 분석"],
      logos: [
        { name: "Naver", url: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Naver_Logotype.svg" },
        { name: "Google Maps", url: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" }
      ]
    },
   {
  id: "infra",
  title: "자생적 인프라",
  desc: "일시적인 처방을 넘어, 컨설팅 종료 후에도 비즈니스가 스스로 성장할 수 있는 체질을 만듭니다.",
  icon: <Zap className="w-8 h-8 text-[#00D4FF]" />,
  bg: isDarkMode ? "bg-[#00D4FF]/10" : "bg-[#F0FBFF]",
  topic: "자생적 성장 동력 확보",
  logicalBasis: "올라운더 커피랩의 실무 노하우를 디지털 SOP로 구조화하여 비즈니스에 내재화합니다. 구조적 안정이 지속적인 성과로 이어지는 자생적 메커니즘을 설계합니다.",
  emotion: "잘 짜인 시스템이 성장을 견인하는 과정을 경험하며 느끼는 비즈니스 운영의 안정감과 확신.",
  features: ["성장을 지속시키는 디지털 SOP", "자생적 비즈니스 메커니즘", "구조적 안정성 중심 시스템"],
  logos: [
    { name: "SystemOS", url: "https://upload.wikimedia.org/wikipedia/commons/1/15/Noun_Project_Coffee_Machine_icon_1180183_cc.svg" },
    { name: "All-rounder", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Coffee_bean_icon.svg" }
  ]
},
    {
      id: "aeo",
      title: "마케팅 (AEO/GEO/SEO)",
      desc: "AI가 당신의 브랜드를 '지역의 정답'으로 학습하게 합니다.",
      icon: <Cpu className="w-8 h-8 text-[#007AFF]" />,
      bg: isDarkMode ? "bg-[#007AFF]/10" : "bg-[#F0F7FF]",
      topic: "트랜드 (Trend Tech) 점유",
      logicalBasis: "ChatGPT, Gemini 등이 즉시 수집 가능한 시맨틱 데이터 피딩 시스템을 구축합니다. SNS의 휘발성 피드가 아닌, 언어 모델의 지식 그래프 내에 브랜드의 뿌리를 내리는 작업입니다.",
      emotion: "광고비 집행 여부와 상관없이 고객이 알아서 찾아오는 압도적인 시스템의 힘과 심리적 안도감을 제공합니다.",
      features: ["지능형 지식그래프 피딩", "LLM 답변 점유 가이드", "지역 거점 데이터 최적화"],
      logos: [
        { name: "ChatGPT", url: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
        { name: "Gemini", url: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
        { name: "Perplexity", url: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Perplexity_AI_logo.svg" }
      ]
    }
  ];

  const selectedService = services.find(s => s.id === selectedTech);

  return (
    <section id="technology" className={`py-24 px-6 md:px-12 transition-colors duration-500 ${isDarkMode ? 'bg-[#1a1e29]' : 'bg-white'}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 space-y-4 text-center">
          <h2 className={`text-3xl md:text-5xl font-black tracking-tight break-keep ${
            isDarkMode ? 'text-white' : 'text-[#10307D]'
          }`}>
            어제보다 더 나은 비즈니스,<br/>올라운더의 솔루션.
          </h2>
          <p className={`font-medium max-w-2xl mx-auto break-keep ${
            isDarkMode ? 'text-white/40' : 'text-gray-400'
          }`}>
            우리는 단순히 서비스를 제공하는 것을 넘어, 스스로 성장하고 작동하는 지능형 비즈니스 구조를 설계합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -8, boxShadow: isDarkMode ? "0 20px 40px rgba(255, 255, 255, 0.05)" : "0 20px 40px rgba(16, 48, 125, 0.05)" }}
              onClick={() => setSelectedTech(service.id)}
              className={`p-8 rounded-[2.5rem] border transition-all cursor-pointer flex flex-col h-full ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10' 
                  : 'bg-[#F8F9FA] border-transparent hover:border-[#10307D]/10 hover:bg-white'
              }`}
            >
              <div className={`w-14 h-14 ${service.bg} rounded-2xl flex items-center justify-center mb-10 transition-colors relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10 flex items-center justify-center scale-150 rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-transform duration-700 md:hidden">
                  {service.icon}
                </div>
                <div className="relative z-10">
                  {service.icon}
                </div>
              </div>
              <h3 className={`text-lg font-bold mb-4 break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{service.title}</h3>
              <p className={`text-[12px] leading-relaxed mb-8 flex-1 break-keep ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{service.desc}</p>
              <div className={`flex items-center gap-2 text-[10px] font-black tracking-widest uppercase ${
                isDarkMode ? 'text-white/60' : 'text-[#10307D]'
              }`}>
                자세히 보기 <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedTech && selectedService && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTech(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              layoutId={selectedService.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-8 md:p-14 relative z-10 ${
                isDarkMode ? 'bg-[#1a1e29] border border-white/10' : 'bg-white'
              }`}
            >
              <button 
                onClick={() => setSelectedTech(null)}
                className={`absolute top-8 right-8 p-3 rounded-full transition-colors ${
                  isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-[#F5F5F7] text-[#10307D]'
                }`}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1 space-y-8">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 ${selectedService.bg} rounded-2xl flex items-center justify-center`}>
                      {selectedService.icon}
                    </div>
                    <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{selectedService.title}</h2>
                  </div>

                  <div className="space-y-10">
                    <div className="group">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                        <h4 className={`text-[11px] font-black tracking-widest uppercase ${isDarkMode ? 'text-blue-400' : 'text-[#007AFF]'}`}>Topic</h4>
                      </div>
                  <p className={`text-xl font-bold leading-relaxed break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
                        {selectedService.topic}
                      </p>
                    </div>

                    <div className="group">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                        <h4 className={`text-[11px] font-black tracking-widest uppercase ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Logical Basis</h4>
                      </div>
                      <p className={`text-[15px] leading-relaxed font-medium break-keep ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        {selectedService.logicalBasis}
                      </p>
                    </div>

                    <div className="group">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1.5 h-6 bg-rose-500 rounded-full" />
                        <h4 className={`text-[11px] font-black tracking-widest uppercase ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>Emotion</h4>
                      </div>
                      <p className={`text-[15px] leading-relaxed italic border-l-4 pl-6 break-keep ${isDarkMode ? 'text-white/90 border-rose-500/30' : 'text-[#10307D] border-[#10307D]/10'}`}>
                        {selectedService.emotion}
                      </p>
                    </div>

                    <div className="pt-4">
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Key Features</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedService.features.map((f: string) => (
                        <div key={f} className={`flex items-center gap-4 p-4 rounded-2xl border overflow-hidden ${
                          isDarkMode ? 'bg-white/5 border-white/5' : 'bg-[#F8F9FA] border-[#10307D]/5'
                        }`}>
                          <CheckCircle2 className="w-5 h-5 text-[#007AFF] shrink-0" />
                          <span className={`text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis ${
                            isDarkMode ? 'text-white/80' : 'text-[#10307D]'
                          }`}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`w-full md:w-64 space-y-10 pt-4 md:pt-12 border-t md:border-t-0 md:border-l md:pl-12 ${
                  isDarkMode ? 'border-white/10' : 'border-gray-100'
                }`}>
                   <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Related Platforms</h4>
                      <div className="flex flex-col gap-4">
                        {selectedService.logos.map((logo) => (
                          <div key={logo.name} className="flex items-center gap-4 group/logo cursor-pointer">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center p-2.5 transition-all border ${
                              isDarkMode 
                                ? 'bg-white/5 border-white/10 group-hover/logo:bg-white group-hover/logo:shadow-white/5' 
                                : 'bg-[#F8F9FA] border-transparent group-hover/logo:bg-white group-hover/logo:shadow-lg group-hover/logo:border-[#10307D]/10'
                            }`}>
                              <img src={logo.url} alt={logo.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                            </div>
                            <span className={`text-[11px] font-bold tracking-wide uppercase transition-opacity ${
                              isDarkMode ? 'text-white/40 group-hover/logo:opacity-100' : 'text-[#10307D] opacity-50 group-hover/logo:opacity-100'
                            }`}>{logo.name}</span>
                          </div>
                        ))}
                      </div>
                   </div>
                   
                      <div className={`p-8 rounded-[2rem] space-y-4 ${
                     isDarkMode ? 'bg-white text-[#0f1118]' : 'bg-[#10307D] text-white'
                   }`}>
                      <BarChart3 className={`w-8 h-8 ${isDarkMode ? 'text-[#0f1118]/40' : 'text-white/40'}`} />
                      <div className="text-sm font-bold leading-tight">
                        데이터 기반<br />
                        전환율 기대치
                        <span className="block text-2xl font-black mt-1">+240%</span>
                      </div>
                      <p className={`text-[9px] uppercase font-bold tracking-widest ${
                        isDarkMode ? 'text-[#0f1118]/30' : 'text-white/30'
                      }`}>Growth Benchmark</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const TeamsSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const teams = [
    {
      topic: "System & Marketing",
      desc: "비즈니스의 뇌와 신경망 설계.",
      process: "매장의 모든 동선과 행위를 데이터화하여 지능형 SOP를 구축합니다. 단순 광고가 아닌 AEO/GEO 최적화를 통해 AI가 먼저 추천하는 브랜드 구조를 만듭니다.",
      icon: <Cpu className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    },
    {
      topic: "Branding",
      desc: "브랜드의 본질(Origin) 추출 및 페르소나 구축.",
      process: "가짜가 판치는 시장에서 '진짜' 인정받는 자부심을 디자인합니다. 로고 하나에도 데이터 모델링과 엔지니어링 분석을 담아 고객의 기억에 남는 고유한 서사를 완성합니다.",
      icon: <Paintbrush className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80&w=800"
    },
    {
      topic: "Bakery / Dessert R&D",
      desc: "시스템화된 고품질 레시피 개발.",
      process: "맛은 기본, '누가 만들어도 동일한 퀄리티'가 나오는 시스템 레시피를 설계합니다. 매장의 컨셉과 상권 데이터에 기반한 시그니처 라인업을 제안합니다.",
      icon: <FlaskConical className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1556610961-2fecc592c188?auto=format&fit=crop&q=80&w=800"
    },
    {
      topic: "Space Design",
      desc: "F&B 최적화 동선 및 공간 엔지니어링.",
      process: "예쁜 공간을 넘어 '돈이 벌리는 공간'을 만듭니다. 주방 동선 1초의 낭비까지 계산한 설계로 직원의 피로도는 낮추고 운영 효율은 극대화하는 시공을 진행합니다.",
      icon: <Compass className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800"
    },
    {
      topic: "Engineering",
      desc: "하드웨어 가동률 100% 보장.",
      process: "커피머신부터 모든 장비의 설치와 유지보수를 책임집니다. 장비 장애로 인한 매출 손실을 제로로 만들기 위해, 정기 점검 SOP와 긴급 대응 체계를 가동합니다.",
      icon: <Settings className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="teams" className={`py-32 px-6 md:px-12 transition-colors duration-500 ${isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 space-y-6">
          <div className="space-y-4">
            <span className={`text-[10px] font-black tracking-[0.5em] uppercase ${isDarkMode ? 'text-blue-400' : 'text-[#007AFF]'}`}>How we work</span>
            <h2 className={`text-4xl md:text-6xl font-black break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>WE ARE ALL-ROUNDER.</h2>
          </div>
          <p className={`text-lg font-medium leading-relaxed max-w-3xl break-keep ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
            우리는 <span className={isDarkMode ? 'text-white' : 'text-[#10307D]'}>[진단 - 설계 - 구축 - 검증]</span>이라는 통합 SOP 프로세스 안에서 움직이며, 사업장이 하나의 완벽한 시스템으로 작동하는 것을 목표로 합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.map((team, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`rounded-[3rem] overflow-hidden border transition-all duration-500 group flex flex-col ${
                isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-[#10307D]/5 hover:shadow-2xl hover:shadow-[#10307D]/10'
              }`}
            >
              <div className="h-[200px] relative overflow-hidden">
                <img 
                  src={team.img} 
                  alt={team.topic} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 bg-white/10 text-white`}>
                    {team.icon}
                  </div>
                </div>
              </div>
              <div className="p-10 space-y-6 flex-1 flex flex-col">
                <div className="space-y-4">
                  <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-blue-400' : 'text-[#007AFF]'}`}>Expertise</h4>
                  <h3 className={`text-2xl font-black break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{team.topic}</h3>
                </div>
                <div className="space-y-4">
                  <p className={`text-sm font-bold break-keep ${isDarkMode ? 'text-white/90' : 'text-[#10307D]'}`}>{team.desc}</p>
                  <div className="space-y-2">
                    <h5 className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`}>Process Mode</h5>
                    <p className={`text-[13px] leading-relaxed break-keep ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{team.process}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DarkPhilosophy = () => (
  <section id="system" className="py-32 md:py-48 bg-[#10307D] relative overflow-hidden">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <span className="inline-block px-10 py-4 border border-white/20 rounded-full text-white text-[10px] font-bold tracking-[0.5em] uppercase backdrop-blur-xl">
          Philosophy: Beyond Survival to Evolution
        </span>
        
        <h2 className="text-[32px] md:text-6xl font-black text-white leading-tight break-keep">
          누구나 시작할 수 있지만,<br />
          아무나 살아남을 수는 없는<br />
          카페 경영의 본질.
        </h2>
        
        <div className="w-20 h-1 bg-white/30 mx-auto rounded-full" />
        
        <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-4xl mx-auto break-keep">
          유행하는 마케팅을 쫓아도 매출은 요지부동이고, 훌륭한 맛을 내놓아도 고객 유입은 막막하며, <br />
          몸부림치며 매출을 올려도 정작 통장은 비어가는 사장님들의 현실을 잘 알고 있습니다. <br /><br />
          
          올라운더 커피랩이 말하는 '자생력'은 일시적인 처방이 아닙니다. <br />
          사장님의 열정을 정교한 시스템(SOP)으로 내재화하여, <br />
          <strong>컨설팅이 끝난 뒤에도 비즈니스가 스스로 길을 찾아 성장하는 힘</strong>을 이식하는 것입니다.
        </p>
      </motion.div>
    </div>
    
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white opacity-[0.03] rounded-full blur-[150px] -z-0 translate-x-1/3 -translate-y-1/3" />
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white opacity-[0.02] rounded-full blur-[120px] -z-0 -translate-x-1/3 translate-y-1/3" />
  </section>
);

const ConsultingRequest = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    representativeName: '',
    contact: '',
    callTime: '',
    inquiry: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/xpqkenvw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          businessName: '',
          representativeName: '',
          contact: '',
          callTime: '',
          inquiry: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className={`py-32 px-6 md:px-12 transition-colors duration-500 ${isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Philosophy Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <span className={`text-[10px] font-black tracking-[0.5em] uppercase ${isDarkMode ? 'text-blue-400' : 'text-[#007AFF]'}`}>
                Consulting Request
              </span>
              <h2 className={`text-5xl md:text-7xl font-black leading-tight break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
                사장님의 열정을<br/>'구조'로 번역합니다.
              </h2>
            </div>
            
            <div className="space-y-8">
              <p className={`text-xl font-light leading-relaxed break-keep ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
                카페 창업은 쉽지만, '살아남는 카페'를 만드는 것은 전혀 다른 영역입니다. 
                훌륭한 커피를 내놓아도 손님이 늘지 않고, 매출은 오르는데 정작 통장은 비어간다면 비즈니스의 설계도(SOP)가 어긋나 있기 때문입니다.<br />
                올라운더 커피랩은 단순한 조언을 넘어, 컨설팅이 끝난 뒤에도 매장이 <br />스스로 문제를 진단하고 성장을 이어가는 '자율 운영 엔진'을 이식합니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100/10">
                <div>
                  <h5 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`}>Phone Support</h5>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>010-5549-4012</p>
                </div>
                <div>
                  <h5 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`}>Email Inquiry</h5>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>arcjejulab@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-8 md:p-12 rounded-[3.5rem] border shadow-2xl transition-all ${
              isDarkMode 
                ? 'bg-white/5 border-white/10 shadow-black/40' 
                : 'bg-white border-[#10307D]/5 shadow-[#10307D]/10'
            }`}
          >
            {status === 'success' ? (
              <div className="py-20 text-center space-y-6">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/10' : 'bg-[#10307D]/5'}`}>
                  <ShieldCheck className={`w-10 h-10 ${isDarkMode ? 'text-blue-400' : 'text-[#10307D]'}`} />
                </div>
                <div className="space-y-2">
                  <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>신청이 완료되었습니다.</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>전문 엔지니어가 검토 후 빠르게 연락드리겠습니다.</p>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className={`text-[10px] font-black tracking-widest uppercase underline underline-offset-4 ${isDarkMode ? 'text-white/40' : 'text-[#10307D]/40'}`}
                >
                  새로 신청하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest block ml-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>상호명</label>
                    <input
                      required
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="비즈니스 이름을 입력하세요"
                      className={`w-full px-6 py-4 rounded-2xl border bg-transparent outline-none transition-all text-sm ${
                        isDarkMode 
                          ? 'border-white/10 focus:border-white/40 text-white placeholder-white/20' 
                          : 'border-[#10307D]/10 focus:border-[#10307D]/40 text-[#10307D] placeholder-gray-400'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest block ml-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>대표자 성함</label>
                    <input
                      required
                      type="text"
                      name="representativeName"
                      value={formData.representativeName}
                      onChange={handleChange}
                      placeholder="성함을 입력하세요"
                      className={`w-full px-6 py-4 rounded-2xl border bg-transparent outline-none transition-all text-sm ${
                        isDarkMode 
                          ? 'border-white/10 focus:border-white/40 text-white placeholder-white/20' 
                          : 'border-[#10307D]/10 focus:border-[#10307D]/40 text-[#10307D] placeholder-gray-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest block ml-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>연락처</label>
                    <input
                      required
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="정확한 피드백을 위한 연락처"
                      className={`w-full px-6 py-4 rounded-2xl border bg-transparent outline-none transition-all text-sm ${
                        isDarkMode 
                          ? 'border-white/10 focus:border-white/40 text-white placeholder-white/20' 
                          : 'border-[#10307D]/10 focus:border-[#10307D]/40 text-[#10307D] placeholder-gray-400'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest block ml-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>통화 가능 시간</label>
                    <input
                      required
                      type="text"
                      name="callTime"
                      value={formData.callTime}
                      onChange={handleChange}
                      placeholder="예: 평일 10:00 - 16:00"
                      className={`w-full px-6 py-4 rounded-2xl border bg-transparent outline-none transition-all text-sm ${
                        isDarkMode 
                          ? 'border-white/10 focus:border-white/40 text-white placeholder-white/20' 
                          : 'border-[#10307D]/10 focus:border-[#10307D]/40 text-[#10307D] placeholder-gray-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest block ml-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>문의 내용</label>
                  <textarea
                    required
                    name="inquiry"
                    rows={4}
                    value={formData.inquiry}
                    onChange={handleChange}
                    placeholder="현재 매장의 문제점이나 구축하고 싶은 SOP 시스템에 대해 자유롭게 기술해 주세요"
                    className={`w-full px-6 py-4 rounded-2xl border bg-transparent outline-none transition-all text-sm resize-none ${
                      isDarkMode 
                        ? 'border-white/10 focus:border-white/40 text-white placeholder-white/20' 
                        : 'border-[#10307D]/10 focus:border-[#10307D]/40 text-[#10307D] placeholder-gray-400'
                    }`}
                  />
                </div>

                <button 
                  disabled={status === 'submitting'}
                  type="submit"
                  className={`w-full py-6 rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDarkMode 
                      ? 'bg-white text-[#0f1118] shadow-white/5' 
                      : 'bg-[#10307D] text-white shadow-[#10307D]/20'
                  }`}
                >
                  {status === 'submitting' ? '처리 중...' : 'SOP 설계 상담 신청'}
                </button>
                
                {status === 'error' && (
                  <p className="text-center text-xs text-red-500 font-bold">오류가 발생했습니다. 다시 시도해 주세요.</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <footer className={`py-16 border-t px-6 md:px-12 transition-colors duration-500 ${
    isDarkMode ? 'bg-[#0f1118] border-white/5' : 'bg-[#EBEBEB] border-[#10307D]/5'
  }`}>
    <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-12">
      <ArcLogo isDark={isDarkMode} />
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-center md:text-left">
        <div className="space-y-4">
          <h5 className={`text-[12px] font-black uppercase tracking-widest break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>Office</h5>
          <p className="text-sm text-gray-500 font-medium break-keep">제주시 삼무로11길 8<br/>올라운더 커피 랩</p>
        </div>
        <div className="space-y-4">
          <h5 className={`text-[12px] font-black uppercase tracking-widest break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>Inquiry</h5>
          <p className="text-sm text-gray-500 font-medium break-keep">상담 시간: 09:00 - 23:00</p>
        </div>
      </div>
      <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
        © 2026 ARC LAB. ALL RIGHTS RESERVED.
      </div>
    </div>
  </footer>
);

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.backgroundColor = isDarkMode ? '#0f1118' : '#EBEBEB';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? 'bg-[#0f1118] text-white' : 'bg-[#EBEBEB] text-[#10307D]'
    } font-sans selection:bg-[#10307D] selection:text-white`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Hero isDarkMode={isDarkMode} />
      <CoreValues isDarkMode={isDarkMode} />
      <div className="hidden md:block">
        <Portfolio isDarkMode={isDarkMode} />
      </div>
      <Solutions isDarkMode={isDarkMode} />
      <TeamsSection isDarkMode={isDarkMode} />
      <DarkPhilosophy />
      <ConsultingRequest isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
// 파일 맨 마지막에 추가
export default function App() {
  return (
    <Router>
      <Routes>
        {/* 기본 주소: 기존 홈페이지(Home) 연결 */}
        <Route path="/" element={<Home />} />
        
        {/* 관리자 주소: 우리가 만든 로그인 페이지 연결 */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/schedule"
  element={
    <ProtectedRoute>
      <Schedule />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/clients"
  element={
    <ProtectedRoute>
      <Clients />
    </ProtectedRoute>
  }
/>
        <Route
  path="/admin/sales-notes"
  element={
    <ProtectedRoute>
      <SalesNotes />
    </ProtectedRoute>
  }
/>
        <Route
  path="/admin/estimates"
  element={
    <ProtectedRoute>
      <Estimates />
    </ProtectedRoute>
  }
/>
      </Routes>
    </Router>
  );
}
