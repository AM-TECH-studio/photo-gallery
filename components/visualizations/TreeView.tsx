
import React from 'react';
import { usePhotos } from '../../context/PhotoContext';

export const TreeView: React.FC = () => {
  const { albums, photos } = usePhotos();
  const activeAlbums = albums.slice(0, 4);

  return (
    <div className="flex flex-col items-center w-full max-w-lg py-2 relative">
      {/* Root Node */}
      <div className="flex flex-col items-center relative z-20">
        <div className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[11px] font-black shadow-2xl ring-4 ring-slate-50 uppercase tracking-[0.2em] relative group">
          Root: Gallery
          <div className="absolute inset-0 bg-[#3B4AF9]/20 rounded-2xl animate-ping pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="h-8 w-1 bg-slate-200" />
      </div>
      
      {/* SVG Connectors - Proportional Fork with Data Flow */}
      <div className="relative w-full h-16 -mt-1 z-10">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 48">
          <defs>
            <linearGradient id="forkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>
            <linearGradient id="flowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B4AF9" />
              <stop offset="100%" stopColor="#3B4AF9" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Static Background Paths */}
          <path 
            d="M 50 0 L 50 12 
               M 12.5 48 L 12.5 30 C 12.5 15, 50 15, 50 30 
               M 37.5 48 L 37.5 30 C 37.5 15, 50 15, 50 30 
               M 62.5 48 L 62.5 30 C 62.5 15, 50 15, 50 30 
               M 87.5 48 L 87.5 30 C 87.5 15, 50 15, 50 30" 
            fill="none" 
            stroke="url(#forkGrad)" 
            strokeWidth="3.5" 
            strokeLinecap="round"
          />

          {/* Data Flow Overlay Paths */}
          {/* We define the paths from Root (Top) to Child (Bottom) for the flow direction */}
          <g className="data-flow-paths">
            {[12.5, 37.5, 62.5, 87.5].map((x, i) => (
              <path
                key={i}
                d={`M 50 0 L 50 15 C 50 15, ${x} 15, ${x} 30 L ${x} 48`}
                fill="none"
                stroke="#3B4AF9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4, 12"
                className="animate-flow"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Children Nodes */}
      <div className="flex justify-between w-full px-2 gap-3 mt-1">
        {activeAlbums.map((album, idx) => {
          const itemCount = photos.filter(p => p.album === album.id).length;
          return (
            <div key={album.id} className="flex flex-col items-center group flex-1 max-w-[90px]">
              <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border-2 border-slate-100 shadow-sm w-full group-hover:border-[#3B4AF9] group-hover:shadow-[#3B4AF9]/10 transition-all duration-500 group-hover:-translate-y-1">
                <span className="text-xl group-hover:scale-110 transition-transform">{album.icon}</span>
                <div className="text-center overflow-hidden w-full border-t border-slate-50 pt-2">
                  <span className="text-[9px] font-black text-slate-800 uppercase tracking-tight block truncate">{album.name}</span>
                  <span className="text-[8px] font-bold text-slate-400 block mt-0.5">{itemCount} objects</span>
                </div>
              </div>
              {/* Leaf indicator */}
              <div className="mt-3 flex gap-1.5 opacity-40 group-hover:opacity-100 transition-all duration-700 translate-y-1 group-hover:translate-y-0">
                 <div className="w-1 h-1 rounded-full bg-[#3B4AF9] animate-pulse" />
                 <div className="w-1 h-1 rounded-full bg-[#3B4AF9] animate-pulse delay-75" />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-12 pt-4 border-t border-slate-100 w-full text-center">
         <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.25em] opacity-60 italic">Recursive O(log N) Traversal</p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flowAnimation {
          from {
            stroke-dashoffset: 48;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-flow {
          animation: flowAnimation 2.5s linear infinite;
          opacity: 0.6;
        }
        .data-flow-paths:hover .animate-flow {
          opacity: 1;
          stroke-width: 3;
        }
      `}} />
    </div>
  );
};
