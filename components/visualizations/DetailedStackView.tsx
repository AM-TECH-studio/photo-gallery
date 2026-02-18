
import React, { useState } from 'react';
import { usePhotos } from '../../context/PhotoContext';

export const DetailedStackView: React.FC = () => {
  const { recycleBin, undoDelete } = usePhotos();
  const [isPopping, setIsPopping] = useState(false);

  const handlePop = () => {
    if (recycleBin.length > 0) {
      setIsPopping(true);
      setTimeout(() => {
        undoDelete();
        setIsPopping(false);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 md:flex-row overflow-hidden">
      {/* Visual Lab Sidebar - Independently Scrollable */}
      <div className="w-full md:w-80 p-8 bg-white border-r border-slate-100 flex flex-col gap-6 shrink-0 h-full overflow-y-auto no-scrollbar shadow-[10px_0_30px_rgba(0,0,0,0.02)] z-20">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Stack Lab</h2>
          <p className="text-[10px] text-rose-600 font-black uppercase tracking-[0.2em]">LIFO Visualizer</p>
        </div>

        <div className="space-y-5">
          <div className="p-5 bg-rose-50 rounded-[2rem] border border-rose-100/50 shadow-sm">
            <h4 className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-3">Stack Control</h4>
            <div className="flex flex-col gap-2">
              <button 
                onClick={handlePop}
                disabled={recycleBin.length === 0 || isPopping}
                className="w-full py-4 bg-rose-600 rounded-2xl text-[11px] font-black text-white flex items-center justify-center gap-2 hover:shadow-2xl disabled:opacity-30 transition-all active:scale-95 shadow-xl shadow-rose-500/20"
              >
                <svg className={`w-4 h-4 ${isPopping ? 'animate-bounce' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                POP (Undo)
              </button>
              <p className="text-[9px] text-rose-400 font-bold text-center mt-1 uppercase tracking-tighter">Removes Top of Stack (TOS)</p>
            </div>
          </div>

          <div className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Memory Complexity</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Push (Delete)</span>
                <span className="text-[10px] font-mono font-black text-emerald-600">$O(1)$</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Pop (Undo)</span>
                <span className="text-[10px] font-mono font-black text-emerald-600">$O(1)$</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Peek (Latest)</span>
                <span className="text-[10px] font-mono font-black text-emerald-600">$O(1)$</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4">
          <div className="bg-slate-900 rounded-[2rem] p-6 text-[10px] font-mono text-emerald-400 overflow-hidden shadow-2xl border border-slate-800">
            <p className="text-slate-500 mb-3 uppercase tracking-widest">// STACK_CLASS</p>
            <p className="text-white">class UndoStack {'{'}</p>
            <p className="pl-4">private storage = [];</p>
            <p className="pl-4 mt-2"><span className="text-rose-400">push</span>(item) {'{'}</p>
            <p className="pl-8 text-slate-400 opacity-60">this.storage.push(item);</p>
            <p className="pl-4">{'}'}</p>
            <p className="pl-4 mt-2"><span className="text-rose-400">pop</span>() {'{'}</p>
            <p className="pl-8 text-slate-400 opacity-60">return this.storage.pop();</p>
            <p className="pl-4">{'}'}</p>
            <p className="text-white">{'}'}</p>
          </div>
          <div className="h-6 shrink-0" />
        </div>
      </div>

      {/* Visual Workspace - Fixed Stage, Scaled to fit */}
      <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center h-full overflow-hidden bg-slate-50/30 relative">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8 md:mb-12">Recycle Bin Visual Memory</h3>
        
        <div className="relative flex flex-col items-center justify-center flex-1 w-full max-h-[70%]">
          {/* TOS Indicator */}
          <div className={`absolute -left-24 md:-left-40 transition-all duration-700 ${recycleBin.length > 0 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ top: '10%' }}>
             <div className="flex items-center gap-3 text-rose-600">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap">Top of Stack</span>
                <svg className="w-12 h-4 hidden md:block" viewBox="0 0 40 10">
                   <path d="M0 5 H35 M30 0 L38 5 L30 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
             </div>
          </div>

          {/* Stack Container - Proportional sizing */}
          <div className="w-64 md:w-80 h-full max-h-[400px] border-x-[6px] border-b-[6px] border-slate-200 rounded-b-[3.5rem] bg-white relative flex flex-col-reverse items-center p-6 md:p-8 gap-3 overflow-hidden shadow-2xl transition-all duration-700 ring-[12px] ring-white/50">
             <div className="absolute inset-0 bg-gradient-to-t from-slate-100/40 via-transparent to-transparent pointer-events-none" />
             
             {recycleBin.length === 0 ? (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 font-black uppercase tracking-widest gap-4 opacity-30 px-6 text-center">
                  <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="text-[10px] tracking-[0.5em] leading-relaxed">Stack Empty</span>
               </div>
             ) : (
               recycleBin.slice(-5).map((item, i) => (
                 <div 
                  key={item.id}
                  className={`w-full h-16 md:h-20 bg-white rounded-2xl border-2 overflow-hidden shadow-xl transition-all duration-700 animate-in slide-in-from-top-12 ${
                    i === recycleBin.slice(-5).length - 1 
                    ? isPopping ? 'translate-y-[-120px] opacity-0 scale-110 blur-sm border-rose-400' : 'border-rose-500 z-10 ring-8 ring-rose-50' 
                    : 'border-slate-100 scale-[0.9] opacity-30 blur-[0.5px]'
                  }`}
                 >
                   <img src={item.url} className="w-full h-full object-cover grayscale brightness-75" />
                   {i === recycleBin.slice(-5).length - 1 && !isPopping && (
                     <div className="absolute inset-0 bg-rose-600/5 flex items-center justify-center">
                        <span className="text-[9px] font-black text-rose-600 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full shadow-lg border border-rose-100 uppercase tracking-[0.2em]">Active TOS</span>
                     </div>
                   )}
                 </div>
               ))
             )}
          </div>

          {/* Bottom Label */}
          <div className="mt-8 text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Stack Pointer: 0x{((recycleBin.length) * 16).toString(16).toUpperCase()}</div>
        </div>

        {/* Footer Info Box - Tighter vertical profile */}
        <div className="mt-12 bg-white px-8 md:px-10 py-5 md:py-6 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.1)] flex items-center gap-6 max-w-xl transition-all hover:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.12)] group mx-6">
           <div className="w-12 h-12 md:w-14 md:h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
             </svg>
           </div>
           <div>
             <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-tight leading-none mb-1.5">Linear Atomic Safety</h4>
             <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
               Recovery follows the <b>reverse order</b> of destruction. This ensures logical state consistency across undo buffers.
             </p>
           </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        button:focus { outline: none; }
      `}} />
    </div>
  );
};
