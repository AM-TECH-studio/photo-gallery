
import React, { useState, useEffect } from 'react';
import { usePhotos } from '../../context/PhotoContext';

export const LinkedListView: React.FC = () => {
  const { photos } = usePhotos();
  const displayPhotos = photos.slice(0, 3);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (displayPhotos.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % displayPhotos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [displayPhotos.length]);
  
  return (
    <div className="flex flex-col items-center w-full py-2">
      <div className="flex items-center gap-6 md:gap-10 justify-center min-h-[160px]">
        {displayPhotos.length > 0 ? displayPhotos.map((photo, i) => (
          <React.Fragment key={photo.id}>
            <div className="relative shrink-0 flex flex-col items-center">
              {/* Pointer indicator above node */}
              <div className={`mb-4 w-1 h-6 transition-all duration-500 ${activeIndex === i ? 'bg-[#3B4AF9] h-8 shadow-[0_0_12px_rgba(59,74,249,0.5)]' : 'bg-slate-300 opacity-40'}`} />
              
              <div className={`w-20 h-20 md:w-28 md:h-28 rounded-[2rem] overflow-hidden border-[6px] transition-all duration-1000 shadow-xl relative z-10 ${
                activeIndex === i 
                ? 'border-[#3B4AF9] scale-110 shadow-[#3B4AF9]/20' 
                : 'border-white scale-90 opacity-40 grayscale'
              }`}>
                <img src={photo.url} alt={`Node ${i}`} className="w-full h-full object-cover brightness-110" />
              </div>
              
              <div className="absolute -bottom-14 left-0 right-0 text-center flex flex-col items-center">
                <span className={`text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeIndex === i ? 'text-black translate-y-1' : 'text-slate-400 opacity-50'}`}>
                  {i === 0 ? 'Header' : i === displayPhotos.length - 1 ? 'Footer' : `Node ${i}`}
                </span>
                <span className={`text-[9px] font-mono mt-1 transition-all duration-500 ${activeIndex === i ? 'opacity-100 text-[#3B4AF9] translate-y-1' : 'opacity-0'}`}>
                  0x{(i * 512).toString(16).toUpperCase()}
                </span>
              </div>
            </div>
            
            {i < displayPhotos.length - 1 && (
              <div className="flex flex-col items-center justify-center gap-3 w-8 md:w-16 shrink-0">
                <div className="flex flex-col gap-2 w-full">
                  <div className={`h-1.5 rounded-full transition-all duration-700 ${activeIndex === i ? 'bg-[#3B4AF9] translate-x-2' : 'bg-slate-200'}`} />
                  <div className={`h-1.5 rounded-full transition-all duration-700 ${activeIndex === i + 1 ? 'bg-[#3B4AF9] -translate-x-2' : 'bg-slate-200'}`} />
                </div>
              </div>
            )}
          </React.Fragment>
        )) : (
          <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">Buffer Empty</div>
        )}
      </div>
      
      <div className="mt-20 w-full pt-6 border-t border-slate-200/50 flex justify-center gap-10 opacity-60">
         <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3B4AF9] shadow-[0_0_8px_rgba(59,74,249,0.8)]" />
            <span className="text-[9px] font-black uppercase text-slate-600 tracking-widest">Next Pointer</span>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Prev Pointer</span>
         </div>
      </div>
    </div>
  );
};
