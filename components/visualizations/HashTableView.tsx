
import React from 'react';
import { usePhotos } from '../../context/PhotoContext';

export const HashTableView: React.FC = () => {
  const { indexedPhotos, searchQuery } = usePhotos();
  
  // Show first 3 entries for visualization
  const entries = Array.from(indexedPhotos.entries()).slice(0, 3);

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-16 py-6 px-4">
      <div className="flex flex-col gap-5 w-full max-w-xs">
        <div className="flex flex-col gap-2">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hashing Engine</span>
           <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-black/5">
             <span className="text-xs font-mono font-black text-slate-300">KEY:</span>
             <span className="text-base text-[#3B4AF9] font-black italic">
               "{searchQuery || 'Family'}"
             </span>
           </div>
        </div>
        <div className="flex flex-col items-center gap-4">
           <div className="w-1 h-12 bg-slate-100 rounded-full" />
           <div className="bg-black text-white px-10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">
             Map Function
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {entries.map(([key, items], i) => (
          <div key={key} className="flex items-center gap-5 bg-white p-4 rounded-[2.2rem] border border-slate-50 shadow-sm group hover:border-[#3B4AF9] transition-all hover:translate-x-3">
            <div className="w-12 h-12 flex items-center justify-center bg-black rounded-2xl text-[10px] font-mono text-white font-black">
              {i}
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-black text-black uppercase tracking-widest">Index Slot</div>
              <div className="text-[10px] font-bold text-[#3B4AF9] italic mt-1">"{key}" &rarr; {items.length} pts</div>
            </div>
            <div className="flex -space-x-4">
              {items.slice(0, 2).map((photo, idx) => (
                <div key={photo.id} className="w-14 h-14 rounded-2xl border-4 border-white shadow-xl overflow-hidden relative group-hover:scale-110 transition-transform" style={{ zIndex: 10 - idx }}>
                  <img src={photo.url} alt="Value" className="w-full h-full object-cover grayscale" />
                </div>
              ))}
              {items.length > 2 && (
                <div className="w-14 h-14 rounded-2xl bg-[#F9F9F9] border-4 border-white shadow-xl flex items-center justify-center text-[11px] font-black text-slate-400 relative z-0">
                  +{items.length - 2}
                </div>
              )}
            </div>
          </div>
        ))}
        {entries.length === 0 && <div className="text-center py-10 text-slate-200 font-black uppercase text-xs tracking-widest">Memory Unallocated</div>}
        <div className="text-[10px] text-center text-slate-400 font-black mt-6 italic flex items-center justify-center gap-3">
           <div className="w-2 h-2 rounded-full bg-[#3B4AF9]" />
           Constant time retrieval via direct addressing
        </div>
      </div>
    </div>
  );
};
