import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          onClick={() => setIsVisible(false)}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center cursor-pointer px-6"
        >
          <div className="max-w-3xl w-full text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <span className="text-white/30 text-[10px] font-bold tracking-[0.5em] uppercase">
                All-rounder Coffee Lab
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="space-y-8"
            >
              <h1 className="text-white text-xl md:text-3xl font-extralight leading-relaxed break-keep">
                "우리는 모두, 꿈을 꾸었습니다."
              </h1>
              
              <div className="space-y-6 text-white/70 text-base md:text-lg font-light leading-relaxed break-keep">
                <p>내 손으로 내린 첫 커피의 설렘과<br />손님들의 웃음으로 가득할 공간을 그리던 그날.</p>
                <p className="text-white/90 font-medium italic">"그런데 오늘도 마감 후,<br />홀로 매출을 들여다보고 계신가요?"</p>
                <p>밤잠 설쳐 개발한 메뉴들도, 유행하는 마케팅도<br />막막한 현실 앞에서는 무력할 때가 많았습니다.</p>
                <p>사장님의 정성과 희생이 성과로 돌아오지 않는 그 마음을 잘 알기에,<br />우리는 사장님의 노력을 <span className="text-white font-bold border-b border-white/30">‘시스템’</span>으로 바꾸려 합니다.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
              className="space-y-8 pt-8"
            >
              <p className="text-white text-lg md:text-xl font-light tracking-wide">
                성공은 사장님의 희생이 아니라,<br />잘 짜인 시스템이 주는 선물이어야 하니까요.
              </p>
              <div className="w-12 h-[1px] bg-white/20 mx-auto" />
              <p className="text-white/30 text-[11px] tracking-[0.3em] animate-pulse">
                화면을 터치하여 시스템 입장하기
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
