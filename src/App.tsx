import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Building2,
  CheckCircle2,
  Coffee,
  Compass,
  Cpu,
  Globe,
  Layers3,
  Moon,
  Search,
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

const container = 'mx-auto w-full max-w-7xl px-6 md:px-10';
const sectionGap = 'py-24 md:py-28';

const ArcLogo = ({ isDark = false }: { isDark?: boolean }) => (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none"
    aria-label="Allrounder Coffee Lab home"
  >
   <img
    src={isDark ? "/public/logo-dark.png" : "/public/logo.png"}
    alt="Allrounder Coffee Lab"
    className="h-20 w-auto object-contain md:h-24"
    draggable={false}
  />
  </button>
);

const menuItems = [
  { id: 'concern', label: '소개' },
  { id: 'solution', label: '함께하는 일' },
  { id: 'search-growth', label: '서비스' },
  { id: 'contact', label: '문의' },
];
const mutedText = (isDarkMode: boolean) =>
  isDarkMode ? 'text-white/62' : 'text-slate-600';

const cardBase = (isDarkMode: boolean) =>
  isDarkMode
    ? 'border-white/10 bg-white/[0.055]'
    : 'border-[#10307D]/5 bg-white shadow-sm';

const tagColor = (isDarkMode: boolean) =>
  isDarkMode ? 'text-blue-300' : 'text-blue-600';

const SectionLabel = ({
  children,
  isDarkMode,
}: {
  children: React.ReactNode;
  isDarkMode: boolean;
}) => (
  <p
    className={`mb-5 text-xs font-black uppercase tracking-[0.42em] ${tagColor(
      isDarkMode
    )}`}
  >
    {children}
  </p>
);

const Header = ({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean; toggleDarkMode: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dropdownData = {
    소개: ['올라운더커피랩', '우리의 방향'],
    '함께하는 일': ['브랜드 방향 정리', '운영 흐름 만들기', '검색과 콘텐츠'],
    서비스: ['브랜딩', '검색 성장', '매장 시스템'],
    문의: ['상담 신청', '연락처'],
  };

  return (
    <nav
      className={`sticky top-0 z-[100] h-20 w-full backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? isDarkMode
            ? 'bg-[#0f1118]/90 shadow-lg'
            : 'bg-[#EBEBEB]/90 shadow-sm'
          : ''
      }`}
    >
      <div className="relative flex h-full w-full items-center justify-between px-6 md:px-12">

        {/* 로고 */}
        <div className="flex items-center">
          <ArcLogo isDark={isDarkMode} />
        </div>

        {/* 메뉴 */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 md:flex gap-12">

          {menuItems.map((item) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                className={`text-base font-bold transition-colors ${
                  isDarkMode
                    ? 'text-white/60 hover:text-white'
                    : 'text-[#10307D]/60 hover:text-[#10307D]'
                }`}
              >
                {item.label}
              </button>

              {activeMenu === item.label && (
  <div className="absolute left-1/2 top-10 w-56 -translate-x-1/2">
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={`rounded-3xl border p-5 ${
        isDarkMode
          ? 'border-white/10 bg-[#161922]'
          : 'border-[#10307D]/10 bg-white'
      } shadow-2xl`}
    >
      <div className="space-y-4">
        {dropdownData[item.label as keyof typeof dropdownData].map((subItem) => (
          <div
            key={subItem}
            className={`cursor-pointer text-sm transition-all hover:translate-x-1 ${
              isDarkMode
                ? 'text-white/70 hover:text-white'
                : 'text-[#10307D]/70 hover:text-[#10307D]'
            }`}
          >
            {subItem}
          </div>
        ))}
      </div>
    </motion.div>
  </div>
)}
            </div>
          ))}
        </div>

        {/* 우측 */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className={`rounded-full p-2.5 ${
              isDarkMode
                ? 'bg-white/10 text-yellow-400'
                : 'bg-[#10307D]/5 text-[#10307D]'
            }`}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth',
              })
            }
            className={`rounded-full px-6 py-2.5 text-[12px] font-black uppercase tracking-widest ${
              isDarkMode
                ? 'bg-white text-[#0f1118]'
                : 'bg-[#10307D] text-white'
            }`}
          >
            상담 문의
          </button>
        </div>

      </div>
    </nav>
  );
};

const Hero = ({ isDarkMode }: { isDarkMode: boolean }) => {

  return (
    <section className={`px-6 py-20 transition-colors duration-500 md:px-10 md:py-24 ${isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'}`}>
      <div className="mx-auto grid min-h-[78vh] max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="space-y-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
            <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'bg-white/10 text-white' : 'bg-[#10307D]/5 text-[#10307D]'}`}>
              <span className={`h-2 w-2 rounded-full ${isDarkMode ? 'bg-white' : 'bg-[#10307D]'}`} />
              Jeju Local Brand Partner
            </div>

            <h1 className={`break-keep text-4xl font-black leading-[1.08] tracking-tight md:text-6xl xl:text-6xl ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
              손님이 다시 찾는
              <br />
              매장을 만듭니다.
            </h1>

            <p className={`max-w-3xl break-keep text-base font-light leading-8 tracking-[-0.01em] md:text-xl md:leading-relaxed ${mutedText(isDarkMode)}`}>
              올라운더커피랩은 매장의 진짜 매력을 발견하고,
              브랜딩, 운영 흐름, 검색과 콘텐츠를 함께 쌓아가며
              스스로 성장할 수 있는 브랜드로 만들어갑니다.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-2xl bg-[#10307D] px-8 py-5 text-xs font-black uppercase tracking-widest text-white shadow-2xl shadow-[#10307D]/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                우리 매장 상담하기
              </button>
            </div>
          </motion.div>

        </div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <div className={`overflow-hidden rounded-[3rem] border shadow-2xl ${isDarkMode ? 'border-white/10 bg-white/5 shadow-black/30' : 'border-[#10307D]/5 bg-white shadow-[#10307D]/10'}`}>
            <div className="relative h-[520px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1600"
                alt="제주 카페 브랜딩과 매장 운영 컨설팅"
                className={`h-full w-full object-cover ${isDarkMode ? 'grayscale-[45%] opacity-60' : 'opacity-95'}`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/88 via-black/25 to-transparent p-10">
                <div className="space-y-4 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/55">Allrounder Coffee Lab</p>
                  <h2 className="break-keep text-3xl font-black leading-tight">
                    좋은 매장은
                    <br />
                    경험으로 기억됩니다.
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

const ConcernSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const concerns = [
    '좋은 공간과 메뉴가 있는데 고객에게 잘 전달되지 않는 매장',
    '방문은 있지만 재방문과 단골 흐름을 더 키우고 싶은 매장',
    '플레이스, 인스타그램, 리뷰, 콘텐츠를 한 방향으로 정리하고 싶은 매장',
  ];

  return (
    <section id="concern" className={`${sectionGap} transition-colors duration-500 ${isDarkMode ? 'bg-[#1a1e29]' : 'bg-white'}`}>
      <div className={`${container} grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start`}>
        <div className="space-y-6">
          <SectionLabel isDarkMode={isDarkMode}>Store Concern</SectionLabel>
          <h2 className={`break-keep text-4xl font-black leading-tight md:text-5xl ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
            사장님의 고민에서
            <br />
            출발합니다.
          </h2>
          <p className={`max-w-lg break-keep text-base leading-8 tracking-[-0.01em] ${mutedText(isDarkMode)}`}>
            매장의 성장은 멋진 문장보다 현실적인 이해에서 시작됩니다.
            우리는 매장의 상황, 고객의 반응, 운영 흐름을 함께 보고 필요한 방향을 정리합니다.
          </p>
        </div>

        <div className="space-y-5">
          {concerns.map((concern, idx) => (
            <motion.div
              key={concern}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={`flex gap-5 rounded-[2rem] border p-8 ${cardBase(isDarkMode)}`}
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-black ${isDarkMode ? 'bg-white/10 text-white' : 'bg-[#10307D]/5 text-[#10307D]'}`}>
                0{idx + 1}
              </div>
              <p className={`break-keep text-lg leading-relaxed ${isDarkMode ? 'text-white/74' : 'text-slate-600'}`}>{concern}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SolutionSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const systems = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: '브랜드 방향 정리',
      desc: '매장의 매력, 고객이 기억할 이유, 콘텐츠의 톤을 하나의 방향으로 정리합니다.',
      tags: ['브랜드 메시지', '고객 경험', '콘텐츠 톤'],
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: '운영 흐름 점검',
      desc: '주문, 응대, 동선, 장비, 직원 운영까지 고객 경험에 영향을 주는 흐름을 함께 봅니다.',
      tags: ['응대 흐름', '매장 동선', '운영 기준'],
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: '검색과 플레이스 관리',
      desc: '네이버 플레이스, 구글 검색, 리뷰 답글, 소개문이 매장의 신뢰로 이어지도록 정리합니다.',
      tags: ['플레이스', '리뷰 답글', '검색 키워드'],
    },
    {
      icon: <Coffee className="h-8 w-8" />,
      title: '콘텐츠 기획',
      desc: '사장님의 진심과 매장의 장점이 사진, 영상, 글로 자연스럽게 전달되도록 기획합니다.',
      tags: ['인스타그램', '블로그', '릴스 기획'],
    },
  ];

  return (
    <section id="solution" className={`${sectionGap} transition-colors duration-500 ${isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'}`}>
      <div className={container}>
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <SectionLabel isDarkMode={isDarkMode}>What We Do</SectionLabel>
            <h2 className={`break-keep text-4xl font-black leading-tight md:text-5xl ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
              매장의 맞는
            <br />
              운영 흐름을 만듭니다.
            </h2>
          </div>
          <p className={`max-w-2xl break-keep text-base leading-8 tracking-[-0.01em] lg:justify-self-end ${mutedText(isDarkMode)}`}>
            올라운더 커피랩은 매장의 상황과 고객 경험을 함께 살펴봅니다.
            브랜딩, 운영, 검색과 콘텐츠가 하나의 흐름으로 이어지도록 매장에 맞는 실행 방향을 만듭니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {systems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={`flex min-h-[390px] flex-col rounded-[2rem] border p-8 ${cardBase(isDarkMode)}`}
            >
              <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl ${isDarkMode ? 'bg-white/10 text-white' : 'bg-[#10307D]/5 text-[#10307D]'}`}>
                {item.icon}
              </div>
              <h3 className={`mb-4 break-keep text-xl font-black ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{item.title}</h3>
              <p className={`mb-8 flex-1 break-keep text-sm leading-7 ${mutedText(isDarkMode)}`}>{item.desc}</p>
              <div className="space-y-3">
                {item.tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#007AFF]" />
                    <span className={`break-keep text-xs font-bold ${isDarkMode ? 'text-white/70' : 'text-[#10307D]/75'}`}>{tag}</span>
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
    { title: '첫인상과 응대', desc: '첫 인사, 주문 안내, 대기 시간, 퇴점 인사까지 고객이 느끼는 접점을 정리합니다.' },
    { title: '직원과 서비스 기준', desc: '사람이 바뀌어도 매장의 분위기와 서비스가 자연스럽게 이어지도록 기준을 만듭니다.' },
    { title: '동선과 운영 효율', desc: '피크타임, 장비 배치, 바 흐름, 재고 관리까지 매장이 편하게 움직이는 구조를 봅니다.' },
  ];

  return (
    <section id="operation" className={`${sectionGap} transition-colors duration-500 ${isDarkMode ? 'bg-[#1a1e29]' : 'bg-white'}`}>
      <div className={`${container} grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center`}>
        <div className="space-y-8">
          <SectionLabel isDarkMode={isDarkMode}>Operation Experience</SectionLabel>
          <h2 className={`break-keep text-4xl font-black leading-tight md:text-5xl ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
            운영도 브랜드의
            <br />
            중요한 경험입니다.
          </h2>
          <p className={`break-keep text-lg leading-8 tracking-[-0.01em] ${mutedText(isDarkMode)}`}>
            고객은 메뉴와 함께 응대, 분위기, 동선, 리뷰까지 매장의 경험으로 기억합니다.
            그래서 운영 기준은 매장의 인상을 오래 지키는 중요한 기준이 됩니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={`flex flex-col gap-6 rounded-[2rem] border p-8 md:flex-row md:items-center ${cardBase(isDarkMode)}`}
            >
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${isDarkMode ? 'bg-white/10 text-white' : 'bg-[#10307D]/5 text-[#10307D]'}`}>
                <Layers3 className="h-7 w-7" />
              </div>
              <div>
                <h3 className={`mb-3 break-keep text-xl font-black ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{item.title}</h3>
                <p className={`break-keep text-sm leading-7 ${mutedText(isDarkMode)}`}>{item.desc}</p>
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
    { icon: <Compass className="h-7 w-7" />, title: '로컬 상권 이해', desc: '제주 지역 고객의 이동 흐름과 매장 방문 이유를 함께 살펴봅니다.' },
    { icon: <Building2 className="h-7 w-7" />, title: '플레이스 신뢰 관리', desc: '소개문, 사진, 리뷰 답글, 키워드가 매장의 인상으로 이어지도록 정리합니다.' },
    { icon: <Globe className="h-7 w-7" />, title: '검색되는 브랜드', desc: '네이버와 구글에서 고객이 매장을 발견하기 쉬운 흐름을 만듭니다.' },
    { icon: <Cpu className="h-7 w-7" />, title: 'AI 검색 대응', desc: 'AI 검색 환경에서도 매장의 방향과 장점이 잘 이해되도록 정보를 정리합니다.' },
  ];

  return (
    <section id="search-growth" className={`${sectionGap} transition-colors duration-500 ${isDarkMode ? 'bg-[#0f1118]' : 'bg-[#F3F4F6]'}`}>
      <div className={`${container} grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start`}>
        <div>
          <SectionLabel isDarkMode={isDarkMode}>Search & Discovery</SectionLabel>
          <h2 className={`break-keep text-4xl font-black leading-tight md:text-5xl ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
            고객이 찾기 쉬운
          <br />
            매장을 만듭니다.
          </h2>
          <p className={`mt-8 max-w-lg break-keep text-base leading-8 tracking-[-0.01em] ${mutedText(isDarkMode)}`}>
            고객은 검색을 통해 매장의 첫인상과 정보를 확인합니다.
            우리는 매장의 정보와 경험이 방문으로 이어지도록 흐름을 정리합니다.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {platforms.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={`rounded-[2rem] border p-8 ${cardBase(isDarkMode)}`}
            >
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${isDarkMode ? 'bg-white/10 text-white' : 'bg-[#10307D]/5 text-[#10307D]'}`}>
                {item.icon}
              </div>
              <h3 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{item.title}</h3>
              <p className={`mt-5 break-keep text-sm leading-7 ${mutedText(isDarkMode)}`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OurApproachSection = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <section className={`${sectionGap} transition-colors duration-500 ${isDarkMode ? 'bg-[#1a1e29]' : 'bg-white'}`}>
    <div className={container}>
      <div className={`rounded-[2rem] border p-9 md:p-14 ${cardBase(isDarkMode)}`}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionLabel isDarkMode={isDarkMode}>Our Approach</SectionLabel>
            <h2 className={`break-keep text-3xl font-black leading-tight md:text-4xl xl:text-[42px] ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
              스스로 성장하는
            <br />
              힘을 만듭니다.
            </h2>
          </div>

          <div className={`space-y-6 break-keep text-base leading-8 tracking-[-0.01em] ${mutedText(isDarkMode)}`}>
            <p>좋은 매장은 외부 도움에만 기대지 않고, 스스로 기준을 만들어갑니다.</p>
            <p>브랜딩, 운영, 검색과 콘텐츠가 한 방향으로 쌓이면 매장의 힘이 더 분명해집니다.</p>
            <p>올라운더 커피랩은 오래도록 사랑받는 브랜드로 성장하는 흐름을 만듭니다.</p>
         </div>
        </div>
      </div>
    </div>
  </section>
);

const PhilosophySection = () => (
  <section className="relative overflow-hidden bg-[#10307D] py-28 md:py-36">
    <div className={`${container} relative z-10 text-center`}>
      <span className="inline-block rounded-full border border-white/20 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.45em] text-white backdrop-blur-xl">
        Allrounder Philosophy
      </span>
      <h2 className="mx-auto mt-10 max-w-4xl break-keep text-[32px] font-black leading-tight text-white md:text-6xl">
        오래 사랑받는 매장은
        <br />
        이유가 분명합니다.
      </h2>
      <div className="mx-auto my-10 h-1 w-20 rounded-full bg-white/30" />
      <p className="mx-auto max-w-3xl break-keep text-base font-light leading-8 text-white/72 md:text-xl md:leading-9">
        매장의 진심이 고객에게 잘 전해지도록 돕습니다.
      <br className="hidden md:block" />
        좋은 경험이 좋은 기억으로 남고, 다시 방문하는 이유가 되도록 함께 고민합니다.
      </p>
    </div>
    <div className="absolute right-0 top-0 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/3 rounded-full bg-white opacity-[0.03] blur-[150px]" />
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
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
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
    <section id="contact" className={`${sectionGap} transition-colors duration-500 ${isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'}`}>
      <div className={`${container} grid grid-cols-1 gap-16 overflow-hidden lg:grid-cols-2 lg:items-start`}>
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-10">
          <div>
            <SectionLabel isDarkMode={isDarkMode}>Consulting Request</SectionLabel>
            <h2 className={`break-keep text-4xl font-black leading-tight md:text-5xl ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
              우리 매장의 이야기를
              <br />
              함께 시작해보세요.
            </h2>
          </div>
         <p className={`max-w-xl break-keep text-base leading-8 tracking-[-0.01em] md:text-lg ${mutedText(isDarkMode)}`}>
           창업 준비, 매장 운영, 브랜딩 방향, 플레이스 관리, 콘텐츠 기획, 검색 흐름까지 현재 상황을 맞는 방향부터 함께 정리해드립니다.
         </p>

          <div className="grid grid-cols-1 gap-6 border-t border-gray-100/10 pt-8 md:grid-cols-2">
            <div>
              <h5 className={`mb-2 text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`}>Phone</h5>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>010-5549-4012</p>
            </div>
            <div>
              <h5 className={`mb-2 text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`}>Email</h5>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>arcjejulab@gmail.com</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.35 }}
          className={`rounded-[2rem] border p-8 shadow-2xl md:p-12 ${
            isDarkMode ? 'border-white/10 bg-white/5 shadow-black/40' : 'border-[#10307D]/5 bg-white shadow-[#10307D]/10'
          }`}
        >
          {status === 'success' ? (
            <div className="space-y-6 py-20 text-center">
              <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-[#10307D]/5'}`}>
                <ShieldCheck className={`h-10 w-10 ${isDarkMode ? 'text-blue-400' : 'text-[#10307D]'}`} />
              </div>
              <div className="space-y-2">
                <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>신청이 완료되었습니다.</h3>
                <p className={`text-sm ${mutedText(isDarkMode)}`}>내용 확인 후 연락드리겠습니다.</p>
              </div>
              <button
                onClick={() => setStatus('idle')}
                className={`text-[10px] font-black uppercase tracking-widest underline underline-offset-4 ${isDarkMode ? 'text-white/40' : 'text-[#10307D]/40'}`}
              >
                새로 신청하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputField isDarkMode={isDarkMode} label="상호명" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="매장 또는 회사명" />
                <InputField isDarkMode={isDarkMode} label="대표자 성함" name="representativeName" value={formData.representativeName} onChange={handleChange} placeholder="성함" />
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputField isDarkMode={isDarkMode} label="연락처" name="contact" type="tel" value={formData.contact} onChange={handleChange} placeholder="연락 가능한 번호" />
                <InputField isDarkMode={isDarkMode} label="통화 가능 시간" name="callTime" value={formData.callTime} onChange={handleChange} placeholder="예: 평일 10:00 - 16:00" />
              </div>
              <div className="space-y-2">
                <label className={`ml-2 block text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                  문의 내용
                </label>
                <textarea
                  required
                  name="inquiry"
                  rows={5}
                  value={formData.inquiry}
                  onChange={handleChange}
                  placeholder="현재 매장에서 고민 중인 내용을 자유롭게 적어주세요. 예: 재방문, 단골, 플레이스 관리, 콘텐츠 방향, 운영 흐름 등"
                  className={`w-full resize-none rounded-2xl border bg-transparent px-6 py-4 text-sm outline-none transition-all ${
                    isDarkMode ? 'border-white/10 text-white placeholder-white/20 focus:border-white/40' : 'border-[#10307D]/10 text-[#10307D] placeholder-gray-400 focus:border-[#10307D]/40'
                  }`}
                />
              </div>
              <button
                disabled={status === 'submitting'}
                type="submit"
                className={`w-full rounded-2xl py-6 text-xs font-black uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${
                  isDarkMode ? 'bg-white text-[#0f1118] shadow-white/5' : 'bg-[#10307D] text-white shadow-[#10307D]/20'
                }`}
              >
                {status === 'submitting' ? '처리 중...' : '상담 신청하기'}
              </button>
              {status === 'error' && <p className="text-center text-xs font-bold text-red-500">전송 중 오류가 발생했습니다. 다시 시도해 주세요.</p>}
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
    <label className={`ml-2 block text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>{label}</label>
    <input
      required
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full rounded-2xl border bg-transparent px-6 py-4 text-sm outline-none transition-all ${
        isDarkMode ? 'border-white/10 text-white placeholder-white/20 focus:border-white/40' : 'border-[#10307D]/10 text-[#10307D] placeholder-gray-400 focus:border-[#10307D]/40'
      }`}
    />
  </div>
);

const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <footer className={`border-t py-16 transition-colors duration-500 ${isDarkMode ? 'border-white/5 bg-[#0f1118]' : 'border-[#10307D]/5 bg-[#EBEBEB]'}`}>
    <div className={`${container} flex flex-col items-center justify-between gap-12 lg:flex-row`}>
      <ArcLogo isDark={isDarkMode} />
      <div className="flex flex-col gap-10 text-center md:flex-row md:gap-20 lg:gap-28 md:text-left">
        <div className="space-y-4">
          <h5 className={`break-keep text-[12px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>Service</h5>
          <p className="break-keep text-sm font-medium leading-7 text-gray-500">
            제주 카페 컨설팅 · 제주 브랜딩
            <br />
            운영 SOP · 플레이스 관리
            <br />
            구글 SEO · AI 검색 대응
          </p>
        </div>
        <div className="space-y-4">
          <h5 className={`break-keep text-[12px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>Office</h5>
          <p className="break-keep text-sm font-medium text-gray-500">
            제주시 삼무로11길 8
            <br />
            올라운더 커피랩
          </p>
        </div>
        <div className="space-y-4">
          <h5 className={`break-keep text-[12px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>Contact</h5>
          <p className="break-keep text-sm font-medium text-gray-500">
            010-5549-4012
            <br />
            arcjejulab@gmail.com
          </p>
        </div>
      </div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">© 2026 ARC LAB. ALL RIGHTS RESERVED.</div>
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
    <div className={`min-h-screen font-sans transition-colors duration-500 selection:bg-[#10307D] selection:text-white ${isDarkMode ? 'bg-[#0f1118] text-white' : 'bg-[#EBEBEB] text-[#10307D]'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      <Hero isDarkMode={isDarkMode} />
      <ConcernSection isDarkMode={isDarkMode} />
      <SolutionSection isDarkMode={isDarkMode} />
      <OperationSection isDarkMode={isDarkMode} />
      <SearchGrowthSection isDarkMode={isDarkMode} />
      <OurApproachSection isDarkMode={isDarkMode} />
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
