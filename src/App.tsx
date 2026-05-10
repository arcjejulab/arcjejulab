import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Coffee,
  Compass,
  Cpu,
  Globe,
  Heart,
  Layout,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  Smartphone,
  Sun,
  Target,
  TrendingUp,
  Users,
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

const ArcLogo = ({ isDark = false }: { isDark?: boolean }) => (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="focus:outline-none transition-all hover:scale-105 active:scale-95 flex items-center justify-center p-2"
    aria-label="Allrounder Coffee Lab home"
  >
    <div className="relative h-10 md:h-12 w-20 flex items-center justify-center">
      <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full drop-shadow-sm">
        <path
          d="M15,30 C15,10 40,5 65,10 C85,15 90,30 85,45 C80,60 50,55 30,50 C10,45 15,40 15,30 Z"
          fill={isDark ? 'white' : BRAND_BLUE}
        />
        <text
          x="48"
          y="38"
          textAnchor="middle"
          fill={isDark ? '#0f1118' : 'white'}
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
  { id: 'consulting', label: '카페 컨설팅' },
  { id: 'marketing', label: '로컬 마케팅' },
  { id: 'proof', label: '포트폴리오' },
  { id: 'contact', label: '상담문의' },
];

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
  const quickProof = [
    { label: 'Cafe Consulting', value: '창업·운영·장비' },
    { label: 'Local Marketing', value: '네이버·인스타·구글' },
    { label: 'Business System', value: 'SOP·동선·매출 구조' },
  ];

  return (
    <section className={`min-h-[86vh] px-6 md:px-12 py-16 md:py-24 transition-colors duration-500 ${isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'}`}>
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
              Jeju Local Business Growth Lab
            </div>

            <h1 className={`text-4xl md:text-7xl font-black leading-[1.05] tracking-tight break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
              제주 로컬 매장의<br />
              성장을 설계합니다.
            </h1>

            <p className={`text-lg md:text-2xl font-light leading-relaxed max-w-3xl break-keep ${isDarkMode ? 'text-white/65' : 'text-gray-600'}`}>
              올라운더 커피랩은 카페 창업, 운영 개선, 장비 세팅, 온라인 마케팅을 <br />하나의 시스템으로 연결하는 실전형 컨설팅 회사입니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-5 bg-[#10307D] text-white rounded-2xl text-xs font-black tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-[#10307D]/20"
              >
                상담 문의하기
              </button>
              <button
                onClick={() => document.getElementById('consulting')?.scrollIntoView({ behavior: 'smooth' })}
                className={`px-8 py-5 rounded-2xl text-xs font-black tracking-widest uppercase border transition-all ${
                  isDarkMode ? 'border-white/15 text-white hover:bg-white/10' : 'border-[#10307D]/15 text-[#10307D] hover:bg-white'
                }`}
              >
                서비스 살펴보기
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickProof.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#10307D]/5 shadow-sm'}`}
              >
                <p className={`text-[10px] font-black tracking-widest uppercase mb-3 ${isDarkMode ? 'text-white/35' : 'text-[#10307D]/45'}`}>{item.label}</p>
                <p className={`text-sm font-black break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{item.value}</p>
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
            <div className="relative h-[480px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1600"
                alt="제주 카페 컨설팅과 로컬 마케팅"
                className={`w-full h-full object-cover ${isDarkMode ? 'grayscale-[55%] opacity-60' : 'opacity-95'}`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent flex items-end p-10">
                <div className="text-white space-y-4">
                  <p className="text-[10px] font-black tracking-[0.35em] uppercase text-white/55">Allrounder Coffee Lab</p>
                  <h2 className="text-3xl font-black leading-tight break-keep">좋은 매장이 더 잘 발견되고, 더 오래 운영되도록.</h2>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ConsultingSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const services = [
    {
      icon: <Coffee className="w-8 h-8" />,
      title: '카페 창업 컨설팅',
      desc: '상권, 메뉴, 장비, 동선, 운영 방식을 창업 전 단계에서 함께 설계합니다.',
      points: ['창업 방향성 진단', '커피머신·주방 장비 구성', '메뉴와 객단가 설계'],
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: '운영 개선 컨설팅',
      desc: '매출은 있는데 남는 게 없거나, 일은 많은데 성장이 막힌 매장의 병목을 찾습니다.',
      points: ['운영 동선 점검', '인건비·원가 구조 진단', 'SOP 정리'],
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: '장비·공간 세팅',
      desc: '장비를 단순히 판매하는 것이 아니라, 매장 운영 구조에 맞게 배치합니다.',
      points: ['커피머신·제빙기 세팅', '바 동선 검토', '설치 후 관리 기준'],
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: '브랜드 구조 정리',
      desc: '대표님의 방향성과 고객이 이해해야 할 메시지를 하나의 브랜드 구조로 정리합니다.',
      points: ['브랜드 문장 정리', '대표 메뉴 포지셔닝', '고객 경험 설계'],
    },
  ];

  return (
    <section id="consulting" className={`py-28 px-6 md:px-12 transition-colors duration-500 ${isDarkMode ? 'bg-[#1a1e29]' : 'bg-white'}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className={`text-[10px] font-black tracking-[0.5em] uppercase ${isDarkMode ? 'text-blue-400' : 'text-[#007AFF]'}`}>Cafe Consulting</span>
            <h2 className={`text-4xl md:text-6xl font-black leading-tight break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>카페를 시작하기 전,<br />운영 구조부터 설계합니다.</h2>
          </div>
          <p className={`max-w-xl text-base leading-relaxed break-keep ${isDarkMode ? 'text-white/55' : 'text-gray-500'}`}>
            예쁜 인테리어와 좋은 장비만으로 매장이 살아남지는 않습니다. 올라운더 커피랩은 창업, 장비, 메뉴, 동선, 운영까지 연결해 실제로 굴러가는 구조를 만듭니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={`p-8 rounded-[2.5rem] border flex flex-col min-h-[360px] ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-[#F8F9FA] border-[#10307D]/5'}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${isDarkMode ? 'bg-white/10 text-white' : 'bg-[#10307D]/5 text-[#10307D]'}`}>
                {service.icon}
              </div>
              <h3 className={`text-xl font-black mb-4 break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{service.title}</h3>
              <p className={`text-sm leading-relaxed mb-8 flex-1 break-keep ${isDarkMode ? 'text-white/55' : 'text-gray-500'}`}>{service.desc}</p>
              <div className="space-y-3">
                {service.points.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#007AFF] shrink-0" />
                    <span className={`text-xs font-bold break-keep ${isDarkMode ? 'text-white/70' : 'text-[#10307D]/75'}`}>{point}</span>
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

const MarketingSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const platforms = [
    { icon: <Search className="w-7 h-7" />, title: '네이버 스마트플레이스', desc: '상호, 소개문, 사진, 리뷰 답글, 키워드 구조를 로컬 검색에 맞게 정리합니다.' },
    { icon: <Smartphone className="w-7 h-7" />, title: '인스타그램 콘텐츠', desc: '릴스, 카드뉴스, 촬영 포인트를 매장의 실제 매력과 연결합니다.' },
    { icon: <Globe className="w-7 h-7" />, title: '블로그·구글 SEO', desc: '지역 키워드와 고객 검색 의도에 맞춘 콘텐츠 구조를 설계합니다.' },
    { icon: <Target className="w-7 h-7" />, title: '상담 전환 설계', desc: '조회수보다 문의와 방문으로 이어지는 문장, 버튼, 페이지 흐름을 만듭니다.' },
  ];

  return (
    <section id="marketing" className={`py-28 px-6 md:px-12 transition-colors duration-500 ${isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'}`}>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        <div className="lg:col-span-5">
  <div className="h-full flex flex-col justify-between">
    <div className="space-y-8">
      <span className={`text-[10px] font-black tracking-[0.5em] uppercase ${isDarkMode ? 'text-blue-400' : 'text-[#007AFF]'}`}>Local Marketing</span>
      <h2 className={`text-4xl md:text-6xl font-black leading-tight break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
        좋은 매장을<br />고객이 발견하게 만듭니다.
      </h2>
      <p className={`max-w-[430px] text-lg leading-relaxed break-keep ${isDarkMode ? 'text-white/55' : 'text-gray-500'}`}>
        마케팅은 화려한 광고 문구가 아니라<br />
        고객이 검색하고, 비교하고, 방문을 결정하는<br />
        흐름을 설계하는 일입니다.
      </p>
    </div>

    <div className={`mt-9 p-8 rounded-[2rem] border max-w-[420px] ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#10307D]/5'}`}>
      <BarChart3 className="w-9 h-9 text-[#007AFF] mb-5" />
      <p className={`text-xl font-black leading-tight break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
        검색 노출 → 신뢰 형성 → 방문 결정
      </p>
      <p className={`text-sm mt-3 leading-relaxed break-keep ${isDarkMode ? 'text-white/45' : 'text-gray-500'}`}>
        플랫폼마다 흩어진 정보를 하나의 브랜드 경험으로 정리합니다.
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
              className={`h-full p-8 rounded-[2.5rem] border min-h-[250px] ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#10307D]/5 shadow-sm'}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${isDarkMode ? 'bg-white/10 text-white' : 'bg-[#10307D]/5 text-[#10307D]'}`}>
                {item.icon}
              </div>
              <h3 className={`text-xl font-black mb-4 break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{item.title}</h3>
              <p className={`text-sm leading-relaxed break-keep ${isDarkMode ? 'text-white/55' : 'text-gray-500'}`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProofSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const proofItems = [
    { title: '직접 운영 경험', desc: '카페와 외식 매장을 직접 운영하며 현장의 문제를 경험했습니다.', icon: <Users className="w-8 h-8" /> },
    { title: '장비·A/S 이해도', desc: '커피머신, 제빙기, 주방 장비의 설치와 유지관리까지 함께 관리합니다.', icon: <Cpu className="w-8 h-8" /> },
    { title: '콘텐츠 제작 역량', desc: '매장 사진, 릴스, 리뷰 답글, 블로그 문구까지 실무형 콘텐츠로 연결합니다.', icon: <TrendingUp className="w-8 h-8" /> },
    { title: '로컬 상권 감각', desc: '제주 지역의 관광 동선과 로컬 고객 흐름에 맞춰 플랫폼 노출 구조를 설계합니다.', icon: <Compass className="w-8 h-8" /> },
  ];

  return (
    <section id="proof" className={`py-28 px-6 md:px-12 transition-colors duration-500 ${isDarkMode ? 'bg-[#1a1e29]' : 'bg-white'}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 space-y-5">
          <span className={`text-[10px] font-black tracking-[0.5em] uppercase ${isDarkMode ? 'text-blue-400' : 'text-[#007AFF]'}`}>Proof & Positioning</span>
          <h2 className={`text-4xl md:text-6xl font-black leading-tight break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>우리는 광고만 보는 회사가 아니라<br />매장의 구조를 보는 회사입니다.</h2>
          <p className={`max-w-3xl mx-auto text-base leading-relaxed break-keep ${isDarkMode ? 'text-white/55' : 'text-gray-500'}`}>
            올라운더 커피랩의 차별점은 현장 운영, 장비, 메뉴, 마케팅을 따로 보지 않는다는 점입니다.<br /> 좋은 매장이 지속 가능한 브랜드로 성장할 수 있도록 운영과 마케팅의 기준을 세웁니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {proofItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-[#F8F9FA] border-[#10307D]/5'}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${isDarkMode ? 'bg-white/10 text-white' : 'bg-[#10307D]/5 text-[#10307D]'}`}>
                {item.icon}
              </div>
              <h3 className={`text-xl font-black mb-4 break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>{item.title}</h3>
              <p className={`text-sm leading-relaxed break-keep ${isDarkMode ? 'text-white/55' : 'text-gray-500'}`}>{item.desc}</p>
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
        매장의 문제는 하나가 아닙니다.<br />그래서 해답도 하나일 수 없습니다.
      </h2>
      <div className="w-20 h-1 bg-white/30 mx-auto rounded-full" />
      <p className="text-lg md:text-xl text-white/72 font-light leading-relaxed max-w-4xl mx-auto break-keep">
        노출이 부족한 매장도 있고, 운영 동선이 무너진 매장도 있고, 메뉴와 가격 구조가 맞지 않는 매장도 있습니다. 올라운더 커피랩은 문제를 따로 떼어 보지 않고, 창업·운영·장비·마케팅을 하나의 성장 구조로 연결합니다.
      </p>
    </div>
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white opacity-[0.03] rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
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
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-10">
          <div className="space-y-6">
            <span className={`text-[10px] font-black tracking-[0.5em] uppercase ${isDarkMode ? 'text-blue-400' : 'text-[#007AFF]'}`}>Consulting Request</span>
            <h2 className={`text-4xl md:text-6xl font-black leading-tight break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>지금 매장의 문제를<br />함께 진단해보세요.</h2>
          </div>
          <p className={`text-lg leading-relaxed break-keep ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
            창업 준비, 매출 정체, 온라인 노출 부족, 장비 세팅, 운영 동선 문제까지 현재 상황을 남겨주시면 현실적으로 적용 가능한 방향부터 정리해드립니다.
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
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
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
                <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>내용 확인 후 연락드리겠습니다.</p>
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
                  placeholder="현재 고민 중인 문제를 자유롭게 적어주세요. 예: 창업 준비, 매출 정체, 스마트플레이스 <br />노출, 인스타그램 운영, 장비 세팅 등"
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
          <p className="text-sm text-gray-500 font-medium break-keep">제주 카페컨설팅 · 로컬 마케팅<br />스마트플레이스 · 인스타그램 · 구글 SEO</p>
        </div>
        <div className="space-y-4">
          <h5 className={`text-[12px] font-black uppercase tracking-widest break-keep ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>Office</h5>
          <p className="text-sm text-gray-500 font-medium break-keep">제주시 삼무로11길 8<br />올라운더 커피 랩</p>
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
    document.body.style.backgroundColor = isDarkMode ? '#0f1118' : '#EBEBEB';
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
      <ConsultingSection isDarkMode={isDarkMode} />
      <MarketingSection isDarkMode={isDarkMode} />
      <ProofSection isDarkMode={isDarkMode} />
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
