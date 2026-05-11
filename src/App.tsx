import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Coffee,
  Compass,
  Cpu,
  Globe,
  Layers3,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Wrench,
} from 'lucide-react';

import AdminLogin from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import Schedule from './pages/Admin/Schedule';
import Clients from './pages/Admin/Clients';
import ProtectedRoute from './pages/Admin/ProtectedRoute';
import SalesNotes from './pages/Admin/SalesNotes';
import Estimates from './pages/Admin/Estimates';
import WorkStatus from './pages/Admin/WorkStatus';
import SalesLedger from './pages/Admin/SalesLedger';

const BRAND_BLUE = '#10307D';
const DARK_BG = '#0f1118';
const LIGHT_BG = '#EBEBEB';

const ArcLogo = ({ isDark = false }: { isDark?: boolean }) => (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="focus:outline-none transition-all hover:scale-105 active:scale-95 flex items-center justify-center p-2"
    aria-label="Allrounder Coffee Lab home"
  >
    <div className="relative h-10 md:h-12 w-20 flex items-center justify-center">
      <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full drop-shadow-sm" role="img" aria-label="ARC LAB logo">
        <path
          d="M15,30 C15,10 40,5 65,10 C85,15 90,30 85,45 C80,60 50,55 30,50 C10,45 15,40 15,30 Z"
          fill={isDark ? 'white' : BRAND_BLUE}
        />
        <text
          x="48"
          y="38"
          textAnchor="middle"
          fill={isDark ? DARK_BG : 'white'}
          className="text-[22px] font-black tracking-tighter"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          ARC
        </text>
      </svg>
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

const menuItems = [
  { id: 'system', label: '브랜딩 시스템' },
  { id: 'operation', label: '운영 SOP' },
  { id: 'search-growth', label: '검색 성장' },
  { id: 'contact', label: '상담문의' },
];

const sectionText = (isDarkMode: boolean) => (isDarkMode ? 'text-white/62' : 'text-slate-600');
const sectionCard = (isDarkMode: boolean) =>
  isDarkMode ? 'bg-white/[0.055] border-white/10' : 'bg-white border-[#10307D]/5 shadow-sm';

const Header = ({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean; toggleDarkMode: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`w-full h-20 px-6 md:px-12 flex items-center justify-between sticky top-0 z-[100] transition-all duration-300 backdrop-blur-md ${
        isScrolled
          ? isDarkMode
            ? 'bg-[#0f1118]/90 shadow-lg py-2'
            : 'bg-[#EBEBEB]/90 shadow-sm py-2'
          : 'py-4'
      }`}
    >
      <div className="flex items-center gap-8">
        <ArcLogo isDark={isDarkMode} />
        <div className="hidden md:flex gap-8">
          {menuItems.map((item) => (
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
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className={`px-6 py-2.5 rounded-full text-[12px] font-black tracking-widest uppercase hover:scale-105 active:scale-95 transition-all ${
            isDarkMode ? 'bg-white text-[#0f1118]' : 'bg-[#10307D] text-white'
          }`}
        >
          상담 문의
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const facts = ['제주 카페 컨설팅', '브랜딩·운영 SOP', '장비·공간·검색 구조'];

  return (
    <section className={`min-h-[88vh] px-6 md:px-12 py-16 md:py-24 transition-colors duration-500 ${isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'}`}>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                isDarkMode ? 'bg-white/10 text-white' : 'bg-[#10307D]/5 text-[#10307D]'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${isDarkMode ? 'bg-white' : 'bg-[#10307D]'}`} />
              Jeju F&B Branding · Operation System
            </div>

            <h1 className={`text-4xl md:text-7xl font-black leading-[1.06] tracking-tight break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
              브랜딩부터 운영까지,<br />
              매장이 실제로 살아 움직이는<br className="hidden md:block" /> 구조를 설계합니다.
            </h1>

            <p className={`text-lg md:text-2xl font-light leading-relaxed max-w-4xl break-keep ${sectionText(isDarkMode)}`}>
              올라운더 커피랩은 제주 카페와 F&B 매장의 브랜딩, 운영 SOP, 장비 세팅, 고객 경험, 플레이스·SEO·AI 검색 대응까지 함께 설계하는 로컬 비즈니스 파트너입니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-5 bg-[#10307D] text-white rounded-2xl text-xs font-black tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-[#10307D]/20"
              >
                제주 카페 컨설팅 문의
              </button>
              <button
                onClick={() => document.getElementById('system')?.scrollIntoView({ behavior: 'smooth' })}
                className={`px-8 py-5 rounded-2xl text-xs font-black tracking-widest uppercase border transition-all ${
                  isDarkMode ? 'border-white/15 text-white hover:bg-white/10' : 'border-[#10307D]/15 text-[#10307D] hover:bg-white'
                }`}
              >
                시스템 보기
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {facts.map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className={`p-6 rounded-3xl border ${sectionCard(isDarkMode)}`}
              >
                <p className={`text-[10px] font-black tracking-widest uppercase mb-3 ${isDarkMode ? 'text-white/35' : 'text-[#10307D]/45'}`}>Focus 0{idx + 1}</p>
                <p className={`text-sm font-black break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{item}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <div className={`rounded-[3.5rem] overflow-hidden border shadow-2xl ${isDarkMode ? 'bg-white/5 border-white/10 shadow-black/30' : 'bg-white border-[#10307D]/5 shadow-[#10307D]/10'}`}>
            <div className="relative h-[520px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1600"
                alt="제주 카페 브랜딩과 매장 운영 시스템 컨설팅"
                className={`w-full h-full object-cover ${isDarkMode ? 'grayscale-[45%] opacity-62' : 'opacity-95'}`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/25 to-transparent flex items-end p-10">
                <div className="text-white space-y-4">
                  <p className="text-[10px] font-black tracking-[0.35em] uppercase text-white/55">Allrounder Coffee Lab</p>
                  <h2 className="text-3xl font-black leading-tight break-keep">
                    브랜드는 보여지는 것이 아니라,<br />
                    경험되고 기억되는 것입니다.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProblemSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const problems = [
    '예쁜 공간은 많지만 왜 이 매장이어야 하는지 설명되지 않습니다.',
    '검색은 되지만 고객 경험과 운영이 연결되지 않아 재방문으로 이어지지 않습니다.',
    '장비, 동선, 응대, 콘텐츠가 따로 움직이면 브랜드의 인상이 흐려집니다.',
  ];

  return (
    <section id="system" className={`py-28 px-6 md:px-12 transition-colors duration-500 ${isDarkMode ? 'bg-[#1a1e29]' : 'bg-white'}`}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          <span className={`text-[10px] font-black tracking-[0.5em] uppercase ${isDarkMode ? 'text-blue-400' : 'text-[#007AFF]'}`}>Why System</span>
          <h2 className={`text-4xl md:text-6xl font-black leading-tight break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
            왜 어떤 브랜드는<br />오래 기억되지 못할까?
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-5">
          {problems.map((problem, idx) => (
            <motion.div
              key={problem}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={`p-7 rounded-[2rem] border flex gap-5 ${sectionCard(isDarkMode)}`}
            >
              <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-sm font-black ${isDarkMode ? 'bg-white/10 text-white' : 'bg-[#10307D]/5 text-[#10307D]'}`}>0{idx + 1}</div>
              <p className={`text-lg leading-relaxed break-keep ${isDarkMode ? 'text-white/74' : 'text-slate-600'}`}>{problem}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SystemSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const systems = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: '브랜딩 설계',
      desc: '브랜드 방향, 브랜드 컬러, 고객 경험, 매장 포지셔닝을 정리합니다.',
      tags: ['브랜드 방향성', '고객 경험', '브랜드 컬러'],
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: '매장 구축',
      desc: '커피머신, 원두, 부재료, 장비, CCTV, 인테리어와 바 동선을 운영 관점에서 연결합니다.',
      tags: ['커피머신·장비', '인테리어·동선', '원두·부재료'],
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: '운영 시스템',
      desc: '운영 SOP, 응대 흐름, 음식물처리기, 청소로봇, 사업자용 장기 리스·렌트까지 효율 구조를 봅니다.',
      tags: ['운영 SOP', '업소용 음식물처리기', '청소로봇·렌트'],
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: '발견과 성장',
      desc: '네이버 플레이스, 구글 SEO, AEO, GEO, AI 검색 대응까지 브랜드가 발견되는 구조를 만듭니다.',
      tags: ['제주 카페 컨설팅', '플레이스·SEO', 'AEO·GEO'],
    },
  ];

  return (
    <section className={`py-28 px-6 md:px-12 transition-colors duration-500 ${isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className={`text-[10px] font-black tracking-[0.5em] uppercase ${isDarkMode ? 'text-blue-400' : 'text-[#007AFF]'}`}>Branding to Operation</span>
            <h2 className={`text-4xl md:text-6xl font-black leading-tight break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>우리는 브랜드와 운영을<br />분리해서 보지 않습니다.</h2>
          </div>
          <p className={`max-w-xl text-base leading-relaxed break-keep ${sectionText(isDarkMode)}`}>
            올라운더 커피랩은 이것저것 다 하는 회사가 아니라, 실제 매장이 굴러가는 전체 흐름을 이해하고 필요한 요소를 하나의 운영 구조로 정리하는 팀입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {systems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={`p-8 rounded-[2.5rem] border min-h-[410px] flex flex-col ${sectionCard(isDarkMode)}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${isDarkMode ? 'bg-white/10 text-white' : 'bg-[#10307D]/5 text-[#10307D]'}`}>
                {item.icon}
              </div>
              <h3 className={`text-xl font-black mb-4 break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{item.title}</h3>
              <p className={`text-sm leading-relaxed mb-8 flex-1 break-keep ${sectionText(isDarkMode)}`}>{item.desc}</p>
              <div className="space-y-3">
                {item.tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#007AFF] shrink-0" />
                    <span className={`text-xs font-bold break-keep ${isDarkMode ? 'text-white/70' : 'text-[#10307D]/75'}`}>{tag}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OperationSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const items = [
    { title: '고객 응대 흐름', desc: '첫 인사부터 주문, 대기, 퇴점까지 브랜드 경험이 흔들리지 않도록 기준을 정리합니다.' },
    { title: '직원 운영 가이드', desc: '사람이 바뀌어도 매장의 톤과 서비스 품질이 유지되도록 운영 언어를 만듭니다.' },
    { title: '동선과 효율 구조', desc: '장비 배치, 바 흐름, 재고, 청소, 폐기물 처리까지 실제 운영 기준으로 점검합니다.' },
  ];

  return (
    <section id="operation" className={`py-28 px-6 md:px-12 transition-colors duration-500 ${isDarkMode ? 'bg-[#1a1e29]' : 'bg-white'}`}>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-8">
          <span className={`text-[10px] font-black tracking-[0.5em] uppercase ${isDarkMode ? 'text-blue-400' : 'text-[#007AFF]'}`}>Operation SOP</span>
          <h2 className={`text-4xl md:text-6xl font-black leading-tight break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
            운영은 브랜드 경험의<br />일부입니다.
          </h2>
          <p className={`text-lg leading-relaxed break-keep ${sectionText(isDarkMode)}`}>
            고객은 인테리어만 기억하지 않습니다. 응대, 속도, 동선, 일관성, 매장의 분위기까지 함께 기억합니다. 그래서 매장 운영 SOP는 단순 매뉴얼이 아니라 브랜드 경험을 지키는 기준입니다.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 gap-5">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={`p-8 rounded-[2.3rem] border flex flex-col md:flex-row md:items-center gap-6 ${sectionCard(isDarkMode)}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-white/10 text-white' : 'bg-[#10307D]/5 text-[#10307D]'}`}>
                <Layers3 className="w-7 h-7" />
              </div>
              <div>
                <h3 className={`text-xl font-black mb-3 break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed break-keep ${sectionText(isDarkMode)}`}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SearchGrowthSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const platforms = [
    { icon: <Compass className="w-7 h-7" />, title: '제주 카페 컨설팅', desc: '제주 로컬 상권, 관광 동선, 매장 운영 현실을 기준으로 방향을 정리합니다.' },
    { icon: <Globe className="w-7 h-7" />, title: 'SEO · AEO · GEO', desc: '구글, 네이버, AI 검색에서 올라운더 커피랩의 정체성이 정확히 읽히도록 문장과 구조를 설계합니다.' },
    { icon: <Building2 className="w-7 h-7" />, title: '플레이스와 신뢰 구조', desc: '상호, 소개문, 키워드, 리뷰 답글, 고객 동선이 하나의 브랜드 경험으로 이어지게 만듭니다.' },
    { icon: <Cpu className="w-7 h-7" />, title: 'AI 검색 대응', desc: 'AI가 브랜드를 요약할 때 잘못된 지역·업종 정보가 아닌 정확한 방향성을 가져가도록 정리합니다.' },
  ];

  return (
    <section id="search-growth" className={`py-28 px-6 md:px-12 transition-colors duration-500 ${isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'}`}>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        <div className="lg:col-span-5">
          <div className="h-full flex flex-col justify-between">
            <div className="space-y-8">
              <span className={`text-[10px] font-black tracking-[0.5em] uppercase ${isDarkMode ? 'text-blue-400' : 'text-[#007AFF]'}`}>Search & Discovery</span>
              <h2 className={`text-4xl md:text-6xl font-black leading-tight break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
                좋은 매장을<br />정확히 발견되게 만듭니다.
              </h2>
              <p className={`max-w-[470px] text-lg leading-relaxed break-keep ${sectionText(isDarkMode)}`}>
                검색 결과에 보여지는 제목과 설명, 홈페이지의 H1 구조, FAQ, 구조화 데이터까지 하나의 의미로 연결되어야 합니다.
              </p>
            </div>

            <div className={`mt-9 p-8 rounded-[2rem] border max-w-[460px] ${sectionCard(isDarkMode)}`}>
              <Search className="w-9 h-9 text-[#007AFF] mb-5" />
              <p className={`text-xl font-black leading-tight break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
                제주 카페 컨설팅 · 제주 브랜딩 · 운영 SOP
              </p>
              <p className={`text-sm mt-3 leading-relaxed break-keep ${sectionText(isDarkMode)}`}>
                검색엔진과 AI가 같은 방향으로 이해하도록 브랜드 문장을 반복합니다.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 md:auto-rows-fr">
          {platforms.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={`h-full p-8 rounded-[2.5rem] border min-h-[250px] ${sectionCard(isDarkMode)}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${isDarkMode ? 'bg-white/10 text-white' : 'bg-[#10307D]/5 text-[#10307D]'}`}>
                {item.icon}
              </div>
              <h3 className={`text-xl font-black mb-4 break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{item.title}</h3>
              <p className={`text-sm leading-relaxed break-keep ${sectionText(isDarkMode)}`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PhilosophySection = () => (
  <section className="py-32 md:py-44 bg-[#10307D] relative overflow-hidden">
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 text-center space-y-10">
      <span className="inline-block px-8 py-4 border border-white/20 rounded-full text-white text-[10px] font-bold tracking-[0.45em] uppercase backdrop-blur-xl">
        Allrounder Philosophy
      </span>
      <h2 className="text-[32px] md:text-6xl font-black text-white leading-tight break-keep">
        검색되는 매장이 아니라,<br />기억되는 브랜드를 만듭니다.
      </h2>
      <div className="w-20 h-1 bg-white/30 mx-auto rounded-full" />
      <p className="text-lg md:text-xl text-white/72 font-light leading-relaxed max-w-4xl mx-auto break-keep">
        우리는 브랜드의 노출보다 브랜드의 이유를 중요하게 생각합니다. 사장님의 진심이 고객에게 닿고, 오래 사랑받는 매장이 되도록 브랜딩과 운영 시스템을 함께 정리합니다.
      </p>
    </div>
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white opacity-[0.03] rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
  </section>
);

const WhatWeAvoidSection = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <section className="bg-white py-28">
  <div className="mx-auto max-w-7xl px-6">
    <div className="rounded-[2rem] border border-slate-200 bg-white px-10 py-14 shadow-sm md:px-14 lg:px-16">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.45em] text-blue-600">
            DO LESS, DESIGN BETTER
          </p>
          <h2 className="text-4xl font-bold leading-tight text-[#0B2C6B] md:text-5xl">
            우리는 실행보다<br />
            방향을 먼저 설계합니다.
          </h2>
        </div>

        <div className="space-y-6 text-base leading-8 text-slate-700">
          <p>
            무분별한 콘텐츠 제작보다 브랜드의 기준을 먼저 세웁니다.
          </p>
          <p>
            검색 노출보다 고객 경험의 흐름과 운영의 일관성을 먼저 정리합니다.
          </p>
          <p>
            사진과 영상은 전문가와 협업하되, 어떤 장면이 필요한지,
            어떤 기준으로 보여져야 하는지를 설계합니다.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
);

const ConsultingRequest = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    representativeName: '',
    contact: '',
    callTime: '',
    inquiry: '',
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
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ businessName: '', representativeName: '', contact: '', callTime: '', inquiry: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className={`py-28 px-6 md:px-12 transition-colors duration-500 ${isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'}`}>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start overflow-hidden">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-10">
          <div className="space-y-6">
            <span className={`text-[10px] font-black tracking-[0.5em] uppercase ${isDarkMode ? 'text-blue-400' : 'text-[#007AFF]'}`}>Consulting Request</span>
            <h2 className={`text-4xl md:text-6xl font-black leading-tight break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>지금 매장의 구조를<br />함께 진단해보세요.</h2>
          </div>
          <p className={`text-lg leading-relaxed break-keep ${sectionText(isDarkMode)}`}>
            창업 준비, 매출 정체, 운영 SOP, 장비 세팅, 브랜드 방향, 제주 카페 컨설팅, 플레이스·SEO·AI 검색 대응까지 현재 상황을 남겨주시면 현실적으로 적용 가능한 방향부터 정리해드립니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-gray-100/10">
            <div>
              <h5 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`}>Phone</h5>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>010-5549-4012</p>
            </div>
            <div>
              <h5 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`}>Email</h5>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>arcjejulab@gmail.com</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.35 }}
          className={`p-8 md:p-12 rounded-[3rem] border shadow-2xl ${
            isDarkMode ? 'bg-white/5 border-white/10 shadow-black/40' : 'bg-white border-[#10307D]/5 shadow-[#10307D]/10'
          }`}
        >
          {status === 'success' ? (
            <div className="py-20 text-center space-y-6">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/10' : 'bg-[#10307D]/5'}`}>
                <ShieldCheck className={`w-10 h-10 ${isDarkMode ? 'text-blue-400' : 'text-[#10307D]'}`} />
              </div>
              <div className="space-y-2">
                <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>신청이 완료되었습니다.</h3>
                <p className={`text-sm ${sectionText(isDarkMode)}`}>내용 확인 후 연락드리겠습니다.</p>
              </div>
              <button onClick={() => setStatus('idle')} className={`text-[10px] font-black tracking-widest uppercase underline underline-offset-4 ${isDarkMode ? 'text-white/40' : 'text-[#10307D]/40'}`}>
                새로 신청하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField isDarkMode={isDarkMode} label="상호명" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="매장 또는 회사명" />
                <InputField isDarkMode={isDarkMode} label="대표자 성함" name="representativeName" value={formData.representativeName} onChange={handleChange} placeholder="성함" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField isDarkMode={isDarkMode} label="연락처" name="contact" type="tel" value={formData.contact} onChange={handleChange} placeholder="연락 가능한 번호" />
                <InputField isDarkMode={isDarkMode} label="통화 가능 시간" name="callTime" value={formData.callTime} onChange={handleChange} placeholder="예: 평일 10:00 - 16:00" />
              </div>
              <div className="space-y-2">
                <label className={`text-[10px] font-black uppercase tracking-widest block ml-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>문의 내용</label>
                <textarea
                  required
                  name="inquiry"
                  rows={5}
                  value={formData.inquiry}
                  onChange={handleChange}
                  placeholder="현재 고민 중인 문제를 자유롭게 적어주세요. 예: 제주 카페 컨설팅, 브랜딩, 운영 SOP, 장비 세팅, 플레이스·SEO, AI 검색 대응 등"
                  className={`w-full px-6 py-4 rounded-2xl border bg-transparent outline-none transition-all text-sm resize-none ${
                    isDarkMode ? 'border-white/10 focus:border-white/40 text-white placeholder-white/20' : 'border-[#10307D]/10 focus:border-[#10307D]/40 text-[#10307D] placeholder-gray-400'
                  }`}
                />
              </div>
              <button
                disabled={status === 'submitting'}
                type="submit"
                className={`w-full py-6 rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDarkMode ? 'bg-white text-[#0f1118] shadow-white/5' : 'bg-[#10307D] text-white shadow-[#10307D]/20'
                }`}
              >
                {status === 'submitting' ? '처리 중...' : '상담 신청하기'}
              </button>
              {status === 'error' && <p className="text-center text-xs text-red-500 font-bold">전송 중 오류가 발생했습니다. 다시 시도해 주세요.</p>}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const InputField = ({
  isDarkMode,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  isDarkMode: boolean;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) => (
  <div className="space-y-2">
    <label className={`text-[10px] font-black uppercase tracking-widest block ml-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>{label}</label>
    <input
      required
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-6 py-4 rounded-2xl border bg-transparent outline-none transition-all text-sm ${
        isDarkMode ? 'border-white/10 focus:border-white/40 text-white placeholder-white/20' : 'border-[#10307D]/10 focus:border-[#10307D]/40 text-[#10307D] placeholder-gray-400'
      }`}
    />
  </div>
);

const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <footer className={`py-16 border-t px-6 md:px-12 transition-colors duration-500 ${isDarkMode ? 'bg-[#0f1118] border-white/5' : 'bg-[#EBEBEB] border-[#10307D]/5'}`}>
    <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-12">
      <ArcLogo isDark={isDarkMode} />
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-center md:text-left">
        <div className="space-y-4">
          <h5 className={`text-[12px] font-black uppercase tracking-widest break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>Service</h5>
          <p className="text-sm text-gray-500 font-medium break-keep">제주 카페 컨설팅 · 제주 브랜딩<br />운영 SOP · F&B 시스템 · AEO/GEO</p>
        </div>
        <div className="space-y-4">
          <h5 className={`text-[12px] font-black uppercase tracking-widest break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>Office</h5>
          <p className="text-sm text-gray-500 font-medium break-keep">제주시 삼무로11길 8<br />올라운더 커피랩</p>
        </div>
        <div className="space-y-4">
          <h5 className={`text-[12px] font-black uppercase tracking-widest break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>Contact</h5>
          <p className="text-sm text-gray-500 font-medium break-keep">010-5549-4012<br />arcjejulab@gmail.com</p>
        </div>
      </div>
      <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">© 2026 ARC LAB. ALL RIGHTS RESERVED.</div>
    </div>
  </footer>
);

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.backgroundColor = isDarkMode ? DARK_BG : LIGHT_BG;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode ? 'bg-[#0f1118] text-white' : 'bg-[#EBEBEB] text-[#10307D]'
      } font-sans selection:bg-[#10307D] selection:text-white`}
    >
      <Header isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      <Hero isDarkMode={isDarkMode} />
      <ProblemSection isDarkMode={isDarkMode} />
      <SystemSection isDarkMode={isDarkMode} />
      <OperationSection isDarkMode={isDarkMode} />
      <SearchGrowthSection isDarkMode={isDarkMode} />
      <WhatWeAvoidSection isDarkMode={isDarkMode} />
      <PhilosophySection />
      <ConsultingRequest isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
        <Route path="/admin/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
        <Route path="/admin/sales-notes" element={<ProtectedRoute><SalesNotes /></ProtectedRoute>} />
        <Route path="/admin/estimates" element={<ProtectedRoute><Estimates /></ProtectedRoute>} />
        <Route path="/admin/work-status" element={<ProtectedRoute><WorkStatus /></ProtectedRoute>} />
        <Route path="/admin/sales-ledger" element={<ProtectedRoute><SalesLedger /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
