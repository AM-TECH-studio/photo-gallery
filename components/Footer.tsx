
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer-section" className="bg-white border-t border-slate-100 mt-20 pt-20 pb-24 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-16 mb-16">
          <FooterStat label="Addressable" value="O(1) Pointers" />
          <FooterStat label="Structure" value="Logarithmic" />
          <FooterStat label="Integrity" value="Strict Atomic" />
        </div>
        
        <div className="h-px w-24 bg-slate-100 mb-12" />
        
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} CORE SYSTEMS ARCHITECTURE. PROPRIETARY EDUCATION.
        </p>
        
        <div className="mt-10 flex justify-center gap-10">
          <span className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <div className="w-2.5 h-2.5 bg-black rounded-full" /> Linear Logic
          </span>
          <span className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <div className="w-2.5 h-2.5 bg-[#3B4AF9] rounded-full" /> Async Pipeline
          </span>
          <span className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <div className="w-2.5 h-2.5 bg-slate-200 rounded-full" /> Memory Slots
          </span>
        </div>
      </div>
    </footer>
  );
};

const FooterStat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="text-center">
    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{label}</div>
    <div className="text-lg font-black text-black tracking-tight">{value}</div>
  </div>
);
