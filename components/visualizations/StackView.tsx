
import React from 'react';
import { usePhotos } from '../../context/PhotoContext';

export const StackView: React.FC = () => {
  const { recycleBin } = usePhotos();
  
  return (
    <div className="relative flex flex-col items-center w-full py-8">
      {/* Dynamic LIFO Action Indicators */}
      <div className="absolute -left-6 md:-left-16 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6 text-[9px] font-black tracking-[0.2em] opacity-80">
        <div className="flex items-center gap-3 text-rose-500 animate-pulse">
          <span>PUSH</span>
          <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <div className="flex items-center gap-3 text-blue-500 animate-pulse" style={{ animationDelay: '2s' }}>
          <span>POP</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      </div>

      {/* Main Stack Container */}
      <div className="flex flex-col-reverse items-center min-h-[160px] justify-end relative">
        
        {/* Ghost Animation Layer (Push/Pop Simulation) */}
        <div className="absolute top-[-40px] w-32 h-12 border-2 border-dashed border-rose-300 rounded-lg opacity-0 animate-stack-ghost pointer-events-none" />

        {recycleBin.length > 0 ? (
          recycleBin.slice(-4).map((photo, i) => {
            const isTop = i === recycleBin.slice(-4).length - 1;
            return (
              <div 
                key={photo.id}
                className={`w-36 h-14 border-2 rounded-xl shadow-xl overflow-hidden bg-white relative transition-all duration-700 ${
                  isTop ? 'border-rose-500 ring-4 ring-rose-50 z-30' : 'border-slate-100 opacity-40 grayscale z-10'
                }`}
                style={{ 
                  marginBottom: '-24px', 
                  transform: `scale(${1 - (recycleBin.slice(-4).length - 1 - i) * 0.05}) translateY(${-i * 2}px)`,
                }}
              >
                 <img src={photo.url} alt="Deleted" className="w-full h-full object-cover opacity-80" />
                 
                 {isTop && (
                   <>
                     <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent" />
                     <div className="absolute top-0 right-0 bg-rose-500 text-[7px] text-white font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-widest">
                       TOS
                     </div>
                     {/* Pulsing indicator for active pointer */}
                     <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.8)] animate-pulse" />
                   </>
                 )}
              </div>
            );
          })
        ) : (
          <div className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] border-2 border-dashed border-slate-300 rounded-2xl p-10 mb-4 bg-slate-200/20 flex flex-col items-center gap-3">
            <svg className="w-6 h-6 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Empty Stack
          </div>
        )}
        
        {/* Base Memory Slot */}
        <div className="w-44 h-10 border-t-4 border-slate-300 mt-10 rounded-b-[2rem] bg-gradient-to-b from-slate-100 to-slate-50 flex items-center justify-center relative overflow-hidden shadow-inner border-x border-b border-slate-200/50">
           <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '4px 4px' }} />
           <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] relative z-10">Address: 0x7FFF</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes stackGhostAction {
          0% {
            transform: translateY(-40px) scale(0.8);
            opacity: 0;
            border-color: #f43f5e;
          }
          20% {
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          45% {
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(0px) scale(1);
            opacity: 0.6;
            border-color: #3b82f6;
          }
          75% {
            transform: translateY(-80px) scale(1.1);
            opacity: 0;
          }
          100% {
            transform: translateY(-80px) scale(1.1);
            opacity: 0;
          }
        }
        .animate-stack-ghost {
          animation: stackGhostAction 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}} />
    </div>
  );
};
