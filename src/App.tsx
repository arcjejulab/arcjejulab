import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import { Moon, ShieldCheck, Sun } from 'lucide-react';

import AdminLogin from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import Schedule from './pages/Admin/Schedule';
import Clients from './pages/Admin/Clients';
import ProtectedRoute from './pages/Admin/ProtectedRoute';
import SalesNotes from './pages/Admin/SalesNotes';
import Estimates from './pages/Admin/Estimates';
import WorkStatus from './pages/Admin/WorkStatus';
import SalesLedger from './pages/Admin/SalesLedger';

const DARK_BG = '#0f1118';
const LIGHT_BG = '#EBEBEB';

const container = 'mx-auto w-full max-w-[1440px] px-6 md:px-12 xl:px-16';
const sectionGap = 'py-24 md:py-28';

const ArcLogo = ({ isDark = false }: { isDark?: boolean }) => (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none"
    aria-label="Allrounder Coffee Lab home"
  >
    <img
      src={isDark ? '/public/logo-dark.png' : '/public/logo.png'}
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

const tagColor = (isDarkMode: boolean) =>
  isDarkMode ? 'text-blue-300' : 'text-blue-600';

const SectionLabel = ({
  children,
  isDarkMode,
}: {
  children: React.ReactNode;
  isDarkMode: boolean;
}) => (
  <p className={`mb-5 text-xs font-black uppercase tracking-[0.42em] ${tagColor(isDarkMode)}`}>
    {children}
  </p>
);

const Header = ({
  isDarkMode,
  toggleDarkMode,
}: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}) => {
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

  const moveToSection = (id: string) => {
    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    window.location.href = `/#${id}`;
  };

  const handleDropdownClick = (subItem: string, parentId: string) => {
    if (subItem === '올라운더커피랩') {
      window.location.href = '/about';
      return;
    }

    if (subItem === '우리의 방향') {
      window.location.href = '/about#direction';
      return;
    }

    moveToSection(parentId);
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
        <div className="flex items-center">
          <ArcLogo isDark={isDarkMode} />
        </div>

        <div className="absolute left-1/2 hidden -translate-x-1/2 gap-12 md:flex">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="relative pb-8"
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                onClick={() => moveToSection(item.id)}
                className={`text-base font-bold transition-colors ${
                  isDarkMode
                    ? 'text-white/60 hover:text-white'
                    : 'text-[#10307D]/60 hover:text-[#10307D]'
                }`}
              >
                {item.label}
              </button>

              {activeMenu === item.label && (
                <div className="absolute left-1/2 top-9 w-56 -translate-x-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className={`rounded-3xl border p-5 shadow-2xl ${
                      isDarkMode
                        ? 'border-white/10 bg-[#161922]'
                        : 'border-[#10307D]/10 bg-white'
                    }`}
                  >
                    <div className="space-y-4">
                      {dropdownData[item.label as keyof typeof dropdownData].map((subItem) => (
                        <div
                          key={subItem}
                          onClick={() => handleDropdownClick(subItem, item.id)}
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

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className={`rounded-full p-2.5 transition-all hover:scale-110 active:scale-90 ${
              isDarkMode ? 'bg-white/10 text-yellow-400' : 'bg-[#10307D]/5 text-[#10307D]'
            }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            onClick={() => moveToSection('contact')}
            className={`rounded-full px-6 py-2.5 text-[12px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${
              isDarkMode ? 'bg-white text-[#0f1118]' : 'bg-[#10307D] text-white'
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
    <section
      className={`px-6 py-20 transition-colors duration-500 md:px-12 md:py-24 xl:px-16 ${
        isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'
      }`}
    >
      <div className="mx-auto grid min-h-[82vh] max-w-[1440px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] xl:gap-24">
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest ${
                isDarkMode ? 'bg-white/10 text-white' : 'bg-[#10307D]/5 text-[#10307D]'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${isDarkMode ? 'bg-white' : 'bg-[#10307D]'}`} />
              Jeju Local Brand Partner
            </div>

            <h1
              className={`break-keep text-5xl font-black leading-[1.02] tracking-[-0.06em] md:text-7xl xl:text-8xl ${
                isDarkMode ? 'text-white' : 'text-[#10307D]'
              }`}
            >
              누구나 스스로
              <br />
              할 수 있게.
            </h1>

            <p
              className={`max-w-4xl break-keep text-lg font-light leading-9 tracking-[-0.015em] md:text-2xl md:leading-[1.65] ${mutedText(
                isDarkMode
              )}`}
            >
              올라운더커피랩이 생각하는 브랜딩의 끝에는 사장님의{' '}
              <span className="text-2xl font-black text-[#10307D] md:text-3xl">자생력</span>
              이 있습니다. 도움 없이도 스스로 해낼 수 있는 실무 능력과 운영 노하우,
              그것이 우리가 만들어나가는 진짜 브랜딩의 가치입니다.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-2xl bg-[#10307D] px-10 py-5 text-sm font-black uppercase tracking-widest text-white shadow-2xl shadow-[#10307D]/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                우리 매장 상담하기
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div
            className={`overflow-hidden rounded-[3rem] border shadow-2xl ${
              isDarkMode
                ? 'border-white/10 bg-white/5 shadow-black/30'
                : 'border-[#10307D]/5 bg-white shadow-[#10307D]/10'
            }`}
          >
            <div className="relative h-[520px] overflow-hidden md:h-[620px] xl:h-[680px]">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1600"
                alt="제주 카페 브랜딩과 매장 운영 컨설팅"
                className={`h-full w-full object-cover ${isDarkMode ? 'grayscale-[45%] opacity-60' : 'opacity-95'}`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/88 via-black/25 to-transparent p-10 md:p-14">
                <div className="space-y-5 text-white">
                  <p className="text-[11px] font-black uppercase tracking-[0.35em] text-white/55">
                    Allrounder Coffee Lab
                  </p>
                  <h2 className="break-keep text-4xl font-black leading-tight md:text-5xl">
                    좋은 매장은
                    <br />
                    경험으로부터
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

const brandStories = [
  {
    id: 'concern',
    keyword: 'JUST AUTHENTIC',
    korean: '진정성',
    headline: ['나의 브랜드가 전하고자 하는 진심이', '고객에게 온전히 닿는 것.'],
    sub: [
      '올라운더 커피랩은 당신의 브랜드가',
      '반짝하는 기교보다 본질에 집중하고,',
      '스스로 성장할 수 있는 힘을 만들어가도록 돕습니다.',
    ],
  },
  {
    id: 'solution',
    keyword: 'BRANDING',
    korean: '브랜딩',
    headline: ['브랜딩은 고객의 기억에서', '완성됩니다.'],
    sub: ['문을 열고 떠난 고객의 마음에', '좋은 기억과 경험으로 남는 것.'],
  },
  {
    id: 'operation',
    keyword: 'SYSTEM',
    korean: '시스템',
    headline: ['스스로 성장하고 발전하는', '정교한 매장 설계'],
    sub: [
      '오차 없는 레시피와 장비 세팅,',
      '현장의 동선과 고객 서비스까지.',
      '매장이 실제로 움직이는 모든 요소를',
      '하나의 구조로 묶어내는 것.',
    ],
  },
  {
    id: 'search-growth',
    keyword: 'MARKETING',
    korean: '마케팅',
    headline: ['사람들의 마음에 깊은 공감을 주는', '진실한 이야기'],
    sub: [
      '브랜드가 가진 본질과 가치를',
      '가장 우리다운 언어로 담아내고,',
      '고객의 발걸음을 기분 좋은 설렘으로 연결하는 것.',
    ],
  },
];

const BrandStorySections = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <section className={`${isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'}`}>
      {brandStories.map((story, index) => {
        const isEven = index % 2 === 0;

        return (
          <section
            key={story.keyword}
            id={story.id}
            className={`relative overflow-hidden transition-colors duration-500 ${
              isDarkMode
                ? isEven
                  ? 'bg-[#0f1118]'
                  : 'bg-[#1a1e29]'
                : isEven
                  ? 'bg-[#EBEBEB]'
                  : 'bg-white'
            }`}
          >
            <div className="relative flex min-h-screen items-center py-28 md:py-36">
              <div
                className={`pointer-events-none absolute left-1/2 top-1/2 select-none text-[18vw] font-black leading-none tracking-[-0.08em] opacity-[0.035] ${
                  isDarkMode ? 'text-white' : 'text-[#10307D]'
                }`}
                style={{ transform: 'translate(-50%, -50%)' }}
              >
                {story.keyword}
              </div>

              <div className={`${container} relative z-10`}>
                <motion.div
                  initial={{ opacity: 0, y: 42 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: false, amount: 0.45 }}
                  className="max-w-7xl"
                >
                  <div
                    className={`mb-10 h-20 w-[3px] rounded-full ${
                      isDarkMode ? 'bg-white/20' : 'bg-[#10307D]/20'
                    }`}
                  />

                  <div className="space-y-5">
                    <h2
                      className={`break-keep text-5xl font-black leading-none tracking-[-0.06em] md:text-8xl xl:text-9xl ${
                        isDarkMode ? 'text-white' : 'text-[#10307D]'
                      }`}
                    >
                      {story.keyword}
                    </h2>

                    <p
                      className={`break-keep text-xl font-black tracking-[0.16em] md:text-3xl ${
                        isDarkMode ? 'text-white/55' : 'text-[#10307D]/55'
                      }`}
                    >
                      {story.korean}
                    </p>
                  </div>

                  <p
                    className={`mt-12 break-keep text-2xl font-black leading-tight tracking-[-0.035em] md:text-5xl ${
                      isDarkMode ? 'text-white/90' : 'text-[#10307D]/90'
                    }`}
                  >
                    {story.headline.map((line) => (
                      <React.Fragment key={line}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="relative flex min-h-[70vh] items-center py-24 md:py-32">
              <div className={`${container}`}>
                <motion.div
                  initial={{ opacity: 0, y: 56, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="ml-auto max-w-5xl"
                >
                  <p
                    className={`break-keep text-xl font-light leading-9 tracking-[-0.015em] md:text-3xl md:leading-[1.55] ${
                      isDarkMode ? 'text-white/72' : 'text-slate-600'
                    }`}
                  >
                    {story.sub.map((line) => (
                      <React.Fragment key={line}>
                        {line}
                        <br className="hidden md:block" />
                      </React.Fragment>
                    ))}
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </section>
  );
};

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
        setFormData({
          businessName: '',
          representativeName: '',
          contact: '',
          callTime: '',
          inquiry: '',
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className={`${sectionGap} transition-colors duration-500 ${
        isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'
      }`}
    >
      <div className={`${container} grid grid-cols-1 gap-16 overflow-hidden lg:grid-cols-2 lg:items-start`}>
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <div>
            <SectionLabel isDarkMode={isDarkMode}>Consulting Request</SectionLabel>
            <h2
              className={`break-keep text-4xl font-black leading-tight md:text-5xl ${
                isDarkMode ? 'text-white' : 'text-[#10307D]'
              }`}
            >
              우리 매장의 이야기를
              <br />
              함께 시작해보세요.
            </h2>
          </div>

          <p
            className={`max-w-xl break-keep text-base leading-8 tracking-[-0.01em] md:text-lg ${mutedText(
              isDarkMode
            )}`}
          >
            창업 준비, 매장 운영, 브랜딩 방향, 플레이스 관리, 콘텐츠 기획, 검색 흐름까지
            현재 상황에 맞는 방향부터 함께 정리해드립니다.
          </p>

          <div className="grid grid-cols-1 gap-6 border-t border-gray-100/10 pt-8 md:grid-cols-2">
            <div>
              <h5
                className={`mb-2 text-[10px] font-black uppercase tracking-widest ${
                  isDarkMode ? 'text-white/30' : 'text-gray-400'
                }`}
              >
                Phone
              </h5>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
                010-5549-4012
              </p>
            </div>
            <div>
              <h5
                className={`mb-2 text-[10px] font-black uppercase tracking-widest ${
                  isDarkMode ? 'text-white/30' : 'text-gray-400'
                }`}
              >
                Email
              </h5>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
                arcjejulab@gmail.com
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.35 }}
          className={`rounded-[2rem] border p-8 shadow-2xl md:p-12 ${
            isDarkMode
              ? 'border-white/10 bg-white/5 shadow-black/40'
              : 'border-[#10307D]/5 bg-white shadow-[#10307D]/10'
          }`}
        >
          {status === 'success' ? (
            <div className="space-y-6 py-20 text-center">
              <div
                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
                  isDarkMode ? 'bg-white/10' : 'bg-[#10307D]/5'
                }`}
              >
                <ShieldCheck className={`h-10 w-10 ${isDarkMode ? 'text-blue-400' : 'text-[#10307D]'}`} />
              </div>
              <div className="space-y-2">
                <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-[#10307D]'}`}>
                  신청이 완료되었습니다.
                </h3>
                <p className={`text-sm ${mutedText(isDarkMode)}`}>내용 확인 후 연락드리겠습니다.</p>
              </div>
              <button
                onClick={() => setStatus('idle')}
                className={`text-[10px] font-black uppercase tracking-widest underline underline-offset-4 ${
                  isDarkMode ? 'text-white/40' : 'text-[#10307D]/40'
                }`}
              >
                새로 신청하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputField
                  isDarkMode={isDarkMode}
                  label="상호명"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="매장 또는 회사명"
                />
                <InputField
                  isDarkMode={isDarkMode}
                  label="대표자 성함"
                  name="representativeName"
                  value={formData.representativeName}
                  onChange={handleChange}
                  placeholder="성함"
                />
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputField
                  isDarkMode={isDarkMode}
                  label="연락처"
                  name="contact"
                  type="tel"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="연락 가능한 번호"
                />
                <InputField
                  isDarkMode={isDarkMode}
                  label="통화 가능 시간"
                  name="callTime"
                  value={formData.callTime}
                  onChange={handleChange}
                  placeholder="예: 평일 10:00 - 16:00"
                />
              </div>
              <div className="space-y-2">
                <label
                  className={`ml-2 block text-[10px] font-black uppercase tracking-widest ${
                    isDarkMode ? 'text-white/40' : 'text-gray-400'
                  }`}
                >
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
                    isDarkMode
                      ? 'border-white/10 text-white placeholder-white/20 focus:border-white/40'
                      : 'border-[#10307D]/10 text-[#10307D] placeholder-gray-400 focus:border-[#10307D]/40'
                  }`}
                />
              </div>
              <button
                disabled={status === 'submitting'}
                type="submit"
                className={`w-full rounded-2xl py-6 text-xs font-black uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${
                  isDarkMode
                    ? 'bg-white text-[#0f1118] shadow-white/5'
                    : 'bg-[#10307D] text-white shadow-[#10307D]/20'
                }`}
              >
                {status === 'submitting' ? '처리 중...' : '상담 신청하기'}
              </button>
              {status === 'error' && (
                <p className="text-center text-xs font-bold text-red-500">
                  전송 중 오류가 발생했습니다. 다시 시도해 주세요.
                </p>
              )}
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
    <label
      className={`ml-2 block text-[10px] font-black uppercase tracking-widest ${
        isDarkMode ? 'text-white/40' : 'text-gray-400'
      }`}
    >
      {label}
    </label>
    <input
      required
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full rounded-2xl border bg-transparent px-6 py-4 text-sm outline-none transition-all ${
        isDarkMode
          ? 'border-white/10 text-white placeholder-white/20 focus:border-white/40'
          : 'border-[#10307D]/10 text-[#10307D] placeholder-gray-400 focus:border-[#10307D]/40'
      }`}
    />
  </div>
);

const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <footer
    className={`border-t py-16 transition-colors duration-500 ${
      isDarkMode ? 'border-white/5 bg-[#0f1118]' : 'border-[#10307D]/5 bg-[#EBEBEB]'
    }`}
  >
    <div className={`${container} flex flex-col items-center justify-between gap-12 lg:flex-row`}>
      <ArcLogo isDark={isDarkMode} />
      <div className="flex flex-col gap-10 text-center md:flex-row md:gap-20 lg:gap-28 md:text-left">
        <div className="space-y-4">
          <h5
            className={`break-keep text-[12px] font-black uppercase tracking-widest ${
              isDarkMode ? 'text-white' : 'text-[#10307D]'
            }`}
          >
            Service
          </h5>
          <p className="break-keep text-sm font-medium leading-7 text-gray-500">
            제주 카페 컨설팅 · 제주 브랜딩
            <br />
            운영 SOP · 플레이스 관리
            <br />
            구글 SEO · AI 검색 대응
          </p>
        </div>
        <div className="space-y-4">
          <h5
            className={`break-keep text-[12px] font-black uppercase tracking-widest ${
              isDarkMode ? 'text-white' : 'text-[#10307D]'
            }`}
          >
            Office
          </h5>
          <p className="break-keep text-sm font-medium text-gray-500">
            제주시 삼무로11길 8
            <br />
            올라운더 커피랩
          </p>
        </div>
        <div className="space-y-4">
          <h5
            className={`break-keep text-[12px] font-black uppercase tracking-widest ${
              isDarkMode ? 'text-white' : 'text-[#10307D]'
            }`}
          >
            Contact
          </h5>
          <p className="break-keep text-sm font-medium text-gray-500">
            010-5549-4012
            <br />
            arcjejulab@gmail.com
          </p>
        </div>
      </div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
        © 2026 ARC LAB. ALL RIGHTS RESERVED.
      </div>
    </div>
  </footer>
);

const AboutPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.backgroundColor = isDarkMode ? DARK_BG : LIGHT_BG;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 selection:bg-[#10307D] selection:text-white ${
        isDarkMode ? 'bg-[#0f1118] text-white' : 'bg-[#EBEBEB] text-[#10307D]'
      }`}
    >
      <Header isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      <main>
        <section
          className={`relative overflow-hidden px-6 py-28 transition-colors duration-500 md:px-10 md:py-36 ${
            isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'
          }`}
        >
          <div
            className={`pointer-events-none absolute -right-24 top-24 select-none text-[18vw] font-black leading-none tracking-[-0.08em] opacity-[0.035] ${
              isDarkMode ? 'text-white' : 'text-[#10307D]'
            }`}
          >
            ABOUT
          </div>

          <div className="relative z-10 mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl"
            >
              <p
                className={`mb-8 text-xs font-black uppercase tracking-[0.45em] ${
                  isDarkMode ? 'text-white/40' : 'text-[#10307D]/45'
                }`}
              >
                About Allrounder Coffee Lab
              </p>

              <h1
  className={`break-keep text-5xl font-black leading-[1.05] tracking-[-0.06em] md:text-7xl xl:text-8xl ${
    isDarkMode ? 'text-white' : 'text-[#10307D]'
  }`}
>
  좋은 공간을 넘어,
  <br />
  스스로 성장할 수 있도록
</h1>

<p
  className={`mt-10 max-w-3xl break-keep text-lg font-light leading-9 tracking-[-0.015em] md:text-2xl md:leading-10 ${
    isDarkMode ? 'text-white/70' : 'text-slate-600'
  }`}
>
  올라운더커피랩은 직접 매장을 운영하며 체득한 본질적인 경험을 바탕으로
  비즈니스의 뼈대를 세우고, 겉으로 보이는 마케팅을 넘어,
  브랜딩·운영 시스템·검색과 콘텐츠가 하나의 흐름으로 이어져
  매장 스스로 성장하고 발전하는 지속 가능한 운영시스템을 구축합니다.
</p>
            </motion.div>

            <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-3">
              <div
                className={`rounded-3xl border p-6 ${
                  isDarkMode
                    ? 'border-white/10 bg-white/[0.045]'
                    : 'border-[#10307D]/5 bg-white shadow-sm'
                }`}
              >
                <p className={`text-sm font-black ${isDarkMode ? 'text-white/72' : 'text-[#10307D]/75'}`}>
                  Built in Jeju
                </p>
              </div>

              <div
                className={`rounded-3xl border p-6 ${
                  isDarkMode
                    ? 'border-white/10 bg-white/[0.045]'
                    : 'border-[#10307D]/5 bg-white shadow-sm'
                }`}
              >
                <p className={`text-sm font-black ${isDarkMode ? 'text-white/72' : 'text-[#10307D]/75'}`}>
                  Branding · System · Marketing
                </p>
              </div>

              <div
                className={`rounded-3xl border p-6 ${
                  isDarkMode
                    ? 'border-white/10 bg-white/[0.045]'
                    : 'border-[#10307D]/5 bg-white shadow-sm'
                }`}
              >
                <p className={`text-sm font-black ${isDarkMode ? 'text-white/72' : 'text-[#10307D]/75'}`}>
                  Self-Sustaining Store
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`px-6 py-28 transition-colors duration-500 md:px-10 md:py-36 ${
            isDarkMode ? 'bg-[#1a1e29]' : 'bg-white'
          }`}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p
                className={`mb-6 text-xs font-black uppercase tracking-[0.45em] ${
                  isDarkMode ? 'text-white/35' : 'text-[#10307D]/45'
                }`}
              >
                Our Beginning
              </p>

              <h2
                className={`break-keep text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl ${
                  isDarkMode ? 'text-white' : 'text-[#10307D]'
                }`}
              >
                시작은 하나의
                <br />
                질문이었습니다.
              </h2>
            </div>

            <div
  className={`space-y-8 break-keep text-lg font-light leading-9 tracking-[-0.015em] md:text-xl md:leading-10 ${
    isDarkMode ? 'text-white/70' : 'text-slate-600'
  }`}
>
  <p>
  고객이 문을 열고 들어오는 순간의 첫 느낌,
  자리에 앉아 머무는 시간,
  매장을 나가는 순간에 느껴지는 감정,
  그리고 매장에서 경험했던 기억들까지.
</p>

<p>
  올라운더커피랩은 그 질문들에서 시작되었습니다.
</p>

<p>
  맛있는 메뉴와 멋진 인테리어도 중요하지만,
  좋은 매장은 결국 사람이 느끼는 감정으로 기억된다고 생각했습니다.
</p>

<p>
  그래서 우리는 매장의 분위기, 직원의 움직임, 운영의 흐름,
  검색과 콘텐츠까지 고객이 실제로 느낄 수 있도록 브랜딩의 방향을 정합니다.
</p>

<p>
  그리고 그 방향이 매장 안에서 실제로 움직일 수 있도록
  운영의 기준, 검색과 콘텐츠의 흐름까지 하나의 구조로 연결합니다.
</p>

<p>
  이 구조가 자리 잡으면 사장님은 외부 도움에만 기대지 않고,
  스스로 판단하고 실행하며 매장을 성장시킬 수 있습니다.
</p>

<p>
  우리는 그것을 매장의 자생력이라고 생각합니다.
</p>
</div>
          </div>
        </section>

        <section
          className={`px-6 py-28 transition-colors duration-500 md:px-10 md:py-36 ${
            isDarkMode ? 'bg-[#0f1118]' : 'bg-[#EBEBEB]'
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <p
                className={`mb-6 text-xs font-black uppercase tracking-[0.45em] ${
                  isDarkMode ? 'text-white/35' : 'text-[#10307D]/45'
                }`}
              >
                People
              </p>

              <h2
                className={`break-keep text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl ${
                  isDarkMode ? 'text-white' : 'text-[#10307D]'
                }`}
              >
                브랜드를 만드는 사람들
              </h2>
            </div>

            <div className="space-y-8">
              <div
                className={`rounded-[3rem] border p-8 md:p-12 ${
                  isDarkMode
                    ? 'border-white/10 bg-white/[0.04]'
                    : 'border-[#10307D]/5 bg-white shadow-sm'
                }`}
              >
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.35fr_1fr] lg:items-center">
                  <div>
                    <p
                      className={`text-xs font-black uppercase tracking-[0.42em] ${
                        isDarkMode ? 'text-white/35' : 'text-[#10307D]/45'
                      }`}
                    >
                      CEO
                    </p>

                    <h3
                      className={`mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl ${
                        isDarkMode ? 'text-white' : 'text-[#10307D]'
                      }`}
                    >
                      CEO
                    </h3>
                  </div>

                  <div
                    className={`min-h-[180px] rounded-[2rem] border border-dashed p-8 ${
                      isDarkMode
                        ? 'border-white/10 bg-black/10'
                        : 'border-[#10307D]/10 bg-[#10307D]/[0.025]'
                    }`}
                  >
                    <p
                      className={`break-keep text-base leading-8 ${
                        isDarkMode ? 'text-white/35' : 'text-[#10307D]/35'
                      }`}
                    >
                      CEO 소개 영역은 추후 작성 예정입니다.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`overflow-hidden rounded-[3rem] border ${
                  isDarkMode
                    ? 'border-white/10 bg-white/[0.055]'
                    : 'border-[#10307D]/5 bg-white shadow-sm'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[0.42fr_1fr]">
                  <div
                    className={`flex min-h-[420px] flex-col justify-between p-8 md:p-12 ${
                      isDarkMode ? 'bg-white/[0.035]' : 'bg-[#10307D]/[0.035]'
                    }`}
                  >
                    <div>
                      <p
                        className={`text-xs font-black uppercase tracking-[0.42em] ${
                          isDarkMode ? 'text-white/35' : 'text-[#10307D]/45'
                        }`}
                      >
                        Director
                      </p>

                      <h3
                        className={`mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl ${
                          isDarkMode ? 'text-white' : 'text-[#10307D]'
                        }`}
                      >
                        Director
                      </h3>
                    </div>

                    <div className="mt-12 space-y-3">
                      <div
                        className={`w-fit rounded-full border px-4 py-2 text-xs font-black ${
                          isDarkMode
                            ? 'border-white/10 text-white/62'
                            : 'border-[#10307D]/10 text-[#10307D]/62'
                        }`}
                      >
                        10년 이상의 현장 경험
                      </div>

                      <div
                        className={`w-fit rounded-full border px-4 py-2 text-xs font-black ${
                          isDarkMode
                            ? 'border-white/10 text-white/62'
                            : 'border-[#10307D]/10 text-[#10307D]/62'
                        }`}
                      >
                        100평대 카페 운영
                      </div>

                      <div
                        className={`w-fit rounded-full border px-4 py-2 text-xs font-black ${
                          isDarkMode
                            ? 'border-white/10 text-white/62'
                            : 'border-[#10307D]/10 text-[#10307D]/62'
                        }`}
                      >
                        커피 유통 · 장비 · 시스템
                      </div>

                      <div
                        className={`w-fit rounded-full border px-4 py-2 text-xs font-black ${
                          isDarkMode
                            ? 'border-white/10 text-white/62'
                            : 'border-[#10307D]/10 text-[#10307D]/62'
                        }`}
                      >
                        브랜딩 · 검색 · 콘텐츠
                      </div>
                    </div>
                  </div>

                  <div className="p-8 md:p-12">
                    <div
                      className={`space-y-7 break-keep text-base font-light leading-8 tracking-[-0.015em] md:text-lg md:leading-9 ${
                        isDarkMode ? 'text-white/72' : 'text-slate-600'
                      }`}
                    >
                     <p>
  사업과 매장을 직접 운영해보지 않고는 사장님의 마음을 온전히 이해하기 어렵다고 생각합니다.
</p>

<p>
  매출이 흔들릴 때의 불안함, 직원이 바뀔 때마다 다시 기준을 세워야 하는 어려움,
  좋은 메뉴와 공간을 가지고도 고객에게 제대로 전해지지 않을 때의 답답함을
  현장에서 직접 경험해왔습니다.
</p>

<p>
  그 경험 속에서 모든 사람이 들어오고 나가는 순간까지 행복한 공간을 만들고 싶었습니다.
  손님은 물론, 그 공간에서 일하는 직원들까지 편안함과 설렘을 느끼는 매장을 꿈꿨습니다.
</p>

<p>
  좋은 매장은 맛있는 메뉴 하나로 완성되지 않습니다.
  응대, 동선, 장비, 직원의 움직임, 고객이 느끼는 분위기까지
  여러 요소가 하나의 흐름으로 이어질 때 만들어집니다.
</p>

<p>
  그 흐름을 이해하기 위해 프랜차이즈에서 새내기 바리스타로 시작해
  총괄 매니저까지 현장을 경험했습니다.
  이후 커피 유통사업과 카페 운영을 거치며
  브랜드, 운영, 장비 세팅, 동선, 고객 응대가 실제 매장에서 어떻게 맞물려야 하는지 배웠습니다.
</p>

<p>
  매장을 직접 운영하고, 창업과 컨설팅 현장을 지나오며
  늘 고객의 입장을 최우선으로 생각하며
  고객이 어떤 순간에 불편함을 느끼는지,
  어떤 경험을 좋은 기억으로 남기는지 꾸준히 연구해왔습니다.
</p>

<p>
  카페와 매장 운영을 중심으로 쌓아온 10년이라는 시간은
  좋은 공간과 좋은 기억을 제공하기 위해 쌓아온 과정이었습니다.
</p>

<p>
  그렇기 때문에 올라운더커피랩은 겉으로 보이는 디자인과 홍보에만 머무르지 않고,
  운영의 문제와 고객 경험의 흐름까지 연결하며,
  매장에 맞는 현실적인 기준을 세웁니다.
</p>

<p>
  브랜딩, 운영 시스템, 장비, 동선, 검색과 콘텐츠가 하나의 흐름으로 이어지고,
  사장님이 스스로 판단하고 운영할 수 있는 기준을 만드는 것.
  그것이 올라운더커피랩이 생각하는 브랜드 파트너의 역할이라고 생각합니다.
</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className={`px-6 py-24 transition-colors duration-500 md:px-10 ${
            isDarkMode ? 'bg-[#1a1e29]' : 'bg-white'
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <div
              className={`rounded-[3rem] border p-10 md:p-14 ${
                isDarkMode
                  ? 'border-white/10 bg-white/[0.055]'
                  : 'border-[#10307D]/5 bg-[#EBEBEB] shadow-sm'
              }`}
            >
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p
                    className={`mb-5 text-xs font-black uppercase tracking-[0.42em] ${
                      isDarkMode ? 'text-blue-300' : 'text-blue-600'
                    }`}
                  >
                    Start With Us
                  </p>

                  <h2
                    className={`break-keep text-3xl font-black leading-tight md:text-5xl ${
                      isDarkMode ? 'text-white' : 'text-[#10307D]'
                    }`}
                  >
                    매장이 나아가야 할 방향을
                    <br />
                    찾아 드립니다.
                  </h2>
                </div>

                <div className="space-y-5">
                  <button
                    onClick={() => {
                      window.location.href = '/#contact';
                    }}
                    className="w-full rounded-2xl bg-[#10307D] px-8 py-5 text-xs font-black uppercase tracking-widest text-white shadow-2xl shadow-[#10307D]/20 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    상담 문의하기
                  </button>

                  <p className={`break-keep text-sm leading-7 ${mutedText(isDarkMode)}`}>
                    창업 준비, 운영 흐름, 브랜딩 방향, 검색과 콘텐츠까지 현재 상황에 맞게 정리합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};
function Home() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.backgroundColor = isDarkMode ? DARK_BG : LIGHT_BG;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 selection:bg-[#10307D] selection:text-white ${
        isDarkMode ? 'bg-[#0f1118] text-white' : 'bg-[#EBEBEB] text-[#10307D]'
      }`}
    >
      <Header isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      <Hero isDarkMode={isDarkMode} />
      <BrandStorySections isDarkMode={isDarkMode} />
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
        <Route path="/about" element={<AboutPage />} />
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
        <Route
          path="/admin/work-status"
          element={
            <ProtectedRoute>
              <WorkStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sales-ledger"
          element={
            <ProtectedRoute>
              <SalesLedger />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
