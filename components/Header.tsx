
import React from 'react';

interface HeaderProps {
  onSetView: (view: 'implementation' | 'gallery') => void;
}

export const Header: React.FC<HeaderProps> = ({ onSetView }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogicClick = () => {
    onSetView('implementation');
    // Small timeout to ensure the view has swapped before scrolling if needed
    setTimeout(() => scrollTo('main-content'), 100);
  };

  return (
    <header className="bg-white/80 border-b border-slate-100 py-6 sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/10 transform -rotate-2">
             <svg className="w-6 h-6 text-[#3B4AF9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>
          </div>
          <div>
            <h1 className="text-xl font-black text-black tracking-tight leading-none uppercase">Architecture <span className="text-[#3B4AF9]">Gallery</span></h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Experimental Media Lab</p>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            <span 
              onClick={() => scrollTo('footer-section')}
              className="text-[11px] font-black text-slate-400 hover:text-black transition-all cursor-pointer uppercase tracking-widest active:scale-95"
            >
              Documentation
            </span>
            <span 
              onClick={handleLogicClick}
              className="text-[11px] font-black text-slate-400 hover:text-black transition-all cursor-pointer uppercase tracking-widest active:scale-95"
            >
              Logic
            </span>
          </nav>
          <div className="h-4 w-px bg-slate-200" />
          <button 
            onClick={() => scrollTo('main-content')}
            className="bg-black text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#3B4AF9] transition-all shadow-xl shadow-black/5 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};
