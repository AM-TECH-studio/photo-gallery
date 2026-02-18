
import React, { useState, useRef, useEffect } from 'react';
import { usePhotos } from '../../context/PhotoContext';

export const DetailedLinkedListView: React.FC = () => {
  const { photos } = usePhotos();
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [animatingDirection, setAnimatingDirection] = useState<'next' | 'prev' | null>(null);
  
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  const list = photos.slice(0, 10);
  const currentNode = list[currentNodeIndex];

  useEffect(() => {
    const track = trackRef.current;
    const targetNode = nodeRefs.current[currentNodeIndex];
    if (track && targetNode) {
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      const nodeCenter = targetNode.offsetLeft + targetNode.clientWidth / 2;
      
      if (Math.abs(trackCenter - nodeCenter) > 20) {
        targetNode.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentNodeIndex]);

  const handleScroll = () => {
    if (!trackRef.current) return;
    
    const container = trackRef.current;
    const centerX = container.scrollLeft + container.clientWidth / 2;
    
    let closestIdx = currentNodeIndex;
    let minDistance = Infinity;

    nodeRefs.current.forEach((node, idx) => {
      if (node) {
        const nodeCenterX = node.offsetLeft + node.clientWidth / 2;
        const distance = Math.abs(centerX - nodeCenterX);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      }
    });

    if (closestIdx !== currentNodeIndex) {
      setCurrentNodeIndex(closestIdx);
    }
  };

  const handleNext = () => {
    if (currentNodeIndex < list.length - 1) {
      setAnimatingDirection('next');
      requestAnimationFrame(() => {
        setCurrentNodeIndex(prev => prev + 1);
        setTimeout(() => setAnimatingDirection(null), 600);
      });
    }
  };

  const handlePrev = () => {
    if (currentNodeIndex > 0) {
      setAnimatingDirection('prev');
      requestAnimationFrame(() => {
        setCurrentNodeIndex(prev => prev - 1);
        setTimeout(() => setAnimatingDirection(null), 600);
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 md:flex-row overflow-hidden select-none">
      {/* Visual Lab Sidebar */}
      <div className="w-full md:w-80 p-8 bg-white border-r border-slate-100 flex flex-col gap-6 shrink-0 z-30 shadow-2xl overflow-y-auto scrollbar-hide">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Interactive Lab</h2>
          <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em]">Doubly Linked List</p>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Manual Traversal</h4>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handlePrev}
                disabled={currentNodeIndex === 0}
                className="w-full py-4 bg-white border-2 border-slate-200 rounded-2xl text-[11px] font-black text-slate-500 flex items-center justify-between px-6 hover:shadow-xl hover:border-blue-600 hover:text-blue-600 disabled:opacity-10 transition-all active:scale-95 group"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>node.prev</span>
                </div>
              </button>
              <button 
                onClick={handleNext}
                disabled={currentNodeIndex === list.length - 1}
                className="w-full py-4 bg-slate-950 rounded-2xl text-[11px] font-black text-white flex items-center justify-between px-6 hover:shadow-2xl hover:bg-blue-600 disabled:opacity-10 transition-all active:scale-95 group shadow-xl shadow-slate-900/10"
              >
                <div className="flex items-center gap-3">
                  <span>node.next</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </button>
            </div>
          </div>

          <div className="p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100/50">
            <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Complexity Analysis</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Step Time</span>
                <span className="text-[10px] font-mono font-black text-blue-600">$O(1)$</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Search</span>
                <span className="text-[10px] font-mono font-black text-slate-500">$O(N)$</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4">
          <div className="bg-slate-50 rounded-[2rem] p-6 text-[10px] font-mono text-slate-600 overflow-hidden shadow-inner border border-slate-100">
            <p className="text-slate-400 mb-3">// Pointer State Matrix</p>
            <p className="text-slate-400">Node {'{'}</p>
            <p className="pl-4 text-slate-500">data: MemoryBuffer;</p>
            <p className={`pl-4 transition-all duration-500 ${animatingDirection === 'prev' ? 'text-blue-600 font-bold' : ''}`}>
              prev: <span className="text-slate-400">0x{((currentNodeIndex-1) * 256).toString(16).toUpperCase()}</span>;
            </p>
            <p className={`pl-4 transition-all duration-500 ${animatingDirection === 'next' ? 'text-blue-600 font-bold' : ''}`}>
              next: <span className="text-slate-400">0x{((currentNodeIndex+1) * 256).toString(16).toUpperCase()}</span>;
            </p>
            <p className="text-slate-400">{'}'}</p>
          </div>
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="flex-1 relative flex flex-col bg-slate-50/50 overflow-hidden">
        
        <div 
          ref={trackRef}
          onScroll={handleScroll}
          className="flex-1 w-full flex items-center overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide snap-x snap-mandatory px-[40vw]"
        >
          <div className="flex items-center gap-20 py-20 min-w-max">
            {list.map((photo, i) => (
              <React.Fragment key={photo.id}>
                <div 
                  ref={el => { nodeRefs.current[i] = el; }}
                  className={`relative flex flex-col items-center shrink-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] snap-center ${
                    i === currentNodeIndex 
                    ? 'scale-[1.3] z-20' 
                    : 'scale-90 opacity-10 blur-[2px] grayscale'
                  }`}
                >
                  {/* Memory Location Identifier */}
                  <div className={`absolute -top-16 px-4 py-1.5 rounded-full border text-[9px] font-black font-mono transition-all duration-500 flex items-center gap-2 ${
                     i === currentNodeIndex ? 'bg-slate-950 text-white border-slate-900 shadow-2xl translate-y-[-10px]' : 'bg-white text-slate-300 border-slate-100'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${i === currentNodeIndex ? 'bg-blue-400' : 'bg-slate-200'}`} />
                    MEM_0x{(i * 256).toString(16).toUpperCase()}
                  </div>

                  {/* High-Fidelity Node UI */}
                  <div className={`w-44 h-64 bg-white rounded-[2.5rem] border-4 transition-all duration-700 flex flex-col overflow-hidden shadow-2xl ${
                    i === currentNodeIndex ? 'border-blue-600 shadow-blue-500/20 ring-[12px] ring-blue-50/50' : 'border-slate-50'
                  }`}>
                    <div className="flex-1 overflow-hidden relative">
                      <img src={photo.url} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="h-20 p-5 bg-white flex flex-col items-center justify-center gap-2 border-t border-slate-50">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${i > 0 ? 'bg-blue-600' : 'bg-slate-100'}`} />
                        <div className="w-12 h-1 bg-slate-50 rounded-full overflow-hidden">
                           <div className={`h-full bg-blue-600 transition-all duration-700 ${i === currentNodeIndex ? 'w-full' : 'w-0'}`} />
                        </div>
                        <div className={`w-2 h-2 rounded-full ${i < list.length - 1 ? 'bg-blue-600' : 'bg-slate-100'}`} />
                      </div>
                      <span className="text-[8px] font-black text-slate-300 tracking-widest uppercase">Pointers</span>
                    </div>
                  </div>
                </div>

                {/* Animated Edge Pointers */}
                {i < list.length - 1 && (
                  <div className="flex flex-col items-center gap-4 shrink-0 px-4">
                    <div className="relative w-24 h-12 flex flex-col justify-between items-center">
                      <svg className={`w-full h-4 transition-all duration-700 ${
                        i === currentNodeIndex && animatingDirection === 'next' ? 'text-blue-600 translate-x-3 scale-x-110' : 'text-slate-100'
                      }`} viewBox="0 0 100 20" preserveAspectRatio="none">
                        <path d="M0 10 H90 M80 0 L92 10 L80 20" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <svg className={`w-full h-4 transition-all duration-700 ${
                        i + 1 === currentNodeIndex && animatingDirection === 'prev' ? 'text-blue-600 -translate-x-3 scale-x-110' : 'text-slate-100'
                      }`} viewBox="0 0 100 20" preserveAspectRatio="none">
                        <path d="M100 10 H10 M20 0 L8 10 L20 20" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Dynamic Context Footer */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-8 z-40">
          <div className="bg-white/90 backdrop-blur-2xl p-8 rounded-[3rem] border border-white shadow-2xl flex items-center gap-8">
            <div className="relative shrink-0 w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-inner">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
               </svg>
            </div>
            <div>
              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-1.5">Sequential Memory Optimization</h4>
              <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
                Traverse without indexed calculation, enabling smooth $O(1)$ transitions. Pointers ensure each node knows only its immediate neighbors.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};
