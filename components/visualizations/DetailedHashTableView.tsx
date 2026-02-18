
import React, { useState, useMemo, useEffect } from 'react';
import { usePhotos } from '../../context/PhotoContext';

export const DetailedHashTableView: React.FC = () => {
  const { photos } = usePhotos();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isHashing, setIsHashing] = useState(false);
  const [hashProgress, setHashProgress] = useState(0);

  const tags = ["home", "people", "nature", "travel", "new", "upload", "work", "family"];
  
  const getHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash += str.charCodeAt(i);
    return hash;
  };

  const TABLE_SIZE = 8;
  const getIndex = (str: string) => getHash(str) % TABLE_SIZE;

  const buckets = useMemo(() => {
    const arr = Array.from({ length: TABLE_SIZE }, () => [] as any[]);
    photos.forEach(p => {
      p.tags.forEach(tag => {
        const idx = getIndex(tag);
        if (tags.includes(tag)) arr[idx].push({ ...p, tag });
      });
    });
    return arr;
  }, [photos]);

  const handleSelectTag = (tag: string) => {
    setIsHashing(true);
    setHashProgress(0);
    setSelectedTag(tag);
  };

  useEffect(() => {
    if (isHashing) {
      const interval = setInterval(() => {
        setHashProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsHashing(false);
            return 100;
          }
          return prev + 5;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isHashing]);

  const activeIndex = selectedTag ? getIndex(selectedTag) : null;
  const activeHash = selectedTag ? getHash(selectedTag) : null;

  return (
    <div className="flex flex-col h-full bg-slate-50 md:flex-row min-h-[650px]">
      <div className="w-full md:w-96 p-10 bg-white border-r border-slate-100 flex flex-col gap-10 shrink-0 shadow-2xl z-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Hash Lab</h2>
          <p className="text-sm text-slate-500 font-semibold leading-relaxed">Demonstrating $O(1)$ constant-time lookup through tag hashing.</p>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-4">Input Key Library</h4>
            <div className="grid grid-cols-2 gap-3">
              {tags.map(tag => (
                <button 
                  key={tag}
                  onClick={() => handleSelectTag(tag)}
                  className={`py-3 px-4 rounded-2xl text-xs font-black uppercase transition-all duration-300 border-2 ${
                    selectedTag === tag 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100 scale-105' 
                    : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:text-indigo-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-200 shadow-inner">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Algorithm Stats</h4>
            <div className="space-y-4">
              <StatRow label="Avg Search" value="O(1)" color="text-emerald-600 bg-emerald-100" />
              <StatRow label="Collision Logic" value="Chaining" color="text-amber-600 bg-amber-100" />
              <StatRow label="Memory Slots" value="8 Buckets" color="text-indigo-600 bg-indigo-100" />
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <div className="bg-slate-950 rounded-2xl p-6 text-xs font-mono text-emerald-400 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
               <div className="w-2 h-2 rounded-full bg-red-500" />
               <div className="w-2 h-2 rounded-full bg-amber-500" />
               <div className="w-2 h-2 rounded-full bg-emerald-500" />
               <span className="ml-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">hashing_engine.ts</span>
            </div>
            <p className="text-white">const <span className="text-indigo-400">hash</span> = (key) =&gt; {'{'}</p>
            <p className="pl-4 text-slate-500 italic mt-1">// Compute deterministic index</p>
            <p className="pl-4 mt-1">let sum = 0;</p>
            <p className="pl-4">for(let c of key) sum += c.charCodeAt();</p>
            <p className="pl-4 text-indigo-400 font-bold mt-1">return sum % 8;</p>
            <p className="text-white">{'}'}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-12 flex flex-col items-center justify-center">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-16">Global Symbol Table Visualization</h3>
        
        <div className="w-full flex flex-col xl:flex-row gap-16 items-center max-w-5xl">
          <div className="flex flex-col items-center gap-8 w-full xl:w-72 shrink-0">
            <div className="flex flex-col items-center w-full">
               <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Lookup String</span>
               <div className="w-full px-8 py-6 bg-white border-2 border-indigo-100 rounded-[2.5rem] shadow-2xl text-2xl font-black text-indigo-600 italic text-center">
                 "{selectedTag || '---'}"
               </div>
            </div>

            <div className="relative w-20 h-20">
               <div className={`w-full h-full rounded-full bg-slate-900 text-white shadow-2xl flex items-center justify-center relative z-10 transition-transform duration-500 ${isHashing ? 'scale-125 rotate-180' : 'scale-100'}`}>
                 <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                 </svg>
               </div>
               {isHashing && (
                 <div className="absolute inset-0 border-4 border-indigo-500 rounded-full animate-ping opacity-25" />
               )}
            </div>

            <div className="w-full flex flex-col items-center">
               <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Address Resolved</span>
               <div className="w-full px-8 py-4 bg-indigo-600 rounded-2xl shadow-xl text-white font-mono text-lg font-black text-center">
                 Bucket {activeIndex !== null ? activeIndex : '--'}
               </div>
               <div className="w-full mt-4 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${hashProgress}%` }} />
               </div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 gap-3 w-full">
            {buckets.map((items, idx) => (
              <div 
                key={idx}
                className={`group flex items-center gap-6 p-4 rounded-3xl border-2 transition-all duration-500 ${
                  activeIndex === idx && !isHashing
                  ? 'bg-white border-indigo-500 scale-[1.03] shadow-2xl z-20' 
                  : 'bg-white border-slate-100 opacity-50 grayscale scale-[0.98]'
                }`}
              >
                <div className={`w-16 h-16 flex flex-col items-center justify-center rounded-2xl text-xs font-black uppercase transition-colors ${
                  activeIndex === idx && !isHashing ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'
                }`}>
                  <span className="text-[10px] opacity-70">Bin</span>
                  {idx}
                </div>
                
                <div className="flex-1 flex gap-3 items-center min-h-[64px]">
                   {items.length === 0 ? (
                     <span className="text-xs font-black text-slate-300 uppercase tracking-widest pl-4 italic">Unallocated Slot</span>
                   ) : (
                     <div className="flex items-center gap-4">
                       {items.map((item, i) => (
                         <div 
                          key={`${item.id}-${i}`}
                          className={`relative w-14 h-14 rounded-2xl overflow-hidden border-2 shadow-lg shrink-0 transition-all duration-500 ${
                            activeIndex === idx && !isHashing ? 'border-indigo-100 scale-110' : 'border-white'
                          }`}
                         >
                           <img src={item.url} className="w-full h-full object-cover" />
                           {items.length > 1 && (
                             <div className="absolute -bottom-1 -right-1 bg-white rounded-tl-xl px-2 py-1 text-[9px] font-black text-indigo-600 shadow-md">#{i+1}</div>
                           )}
                         </div>
                       ))}
                       {items.length > 1 && (
                         <div className="ml-4 flex flex-col items-start gap-1">
                            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50 px-2 py-1 rounded-lg">Collision Identified</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Linked List Chaining Enabled</span>
                         </div>
                       )}
                     </div>
                   )}
                </div>
                
                {activeIndex === idx && !isHashing && (
                  <div className="hidden md:flex flex-col items-end pr-6 animate-in slide-in-from-right-8 duration-500">
                     <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Entry Fetched</span>
                     <span className="text-[10px] font-bold text-slate-400 mt-1">PTR: 0x{(idx * 1024).toString(16).toUpperCase()}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 bg-white px-12 py-8 rounded-[3rem] border border-slate-100 shadow-2xl flex items-center gap-8 max-w-3xl">
           <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-lg shadow-indigo-50">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
             </svg>
           </div>
           <div>
             <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-none mb-2">Constant Time Performance</h4>
             <p className="text-sm text-slate-500 font-medium leading-relaxed">
               Because the hash function resolves keys to a specific memory address, we don't have to iterate through the list. This makes photo search performance independent of library size.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

const StatRow: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
    <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{label}</span>
    <span className={`text-[11px] font-black px-3 py-1 rounded-lg uppercase tracking-wider ${color}`}>{value}</span>
  </div>
);
