
import React, { useState } from 'react';
import { usePhotos } from '../../context/PhotoContext';

export const DetailedQueueView: React.FC = () => {
  const { uploadQueue, uploadPhoto, processUpload } = usePhotos();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEnqueue = () => {
    uploadPhoto(`https://picsum.photos/200/200?random=${Date.now()}`);
  };

  const handleDequeue = () => {
    if (uploadQueue.length > 0) {
      setIsProcessing(true);
      setTimeout(() => {
        processUpload();
        setIsProcessing(false);
      }, 600);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 md:flex-row overflow-hidden">
      {/* Visual Lab Sidebar - Independently Scrollable */}
      <div className="w-full md:w-80 p-8 bg-white border-r border-slate-100 flex flex-col gap-6 shrink-0 h-full overflow-y-auto no-scrollbar shadow-[10px_0_30px_rgba(0,0,0,0.02)] z-20">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Queue Lab</h2>
          <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em]">FIFO Visualizer</p>
        </div>

        <div className="space-y-5">
          <div className="p-5 bg-emerald-50 rounded-[2rem] border border-emerald-100/50 shadow-sm">
            <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">Buffer Control</h4>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleEnqueue}
                className="w-full py-4 bg-emerald-600 rounded-2xl text-[11px] font-black text-white flex items-center justify-center gap-2 hover:shadow-2xl transition-all active:scale-95 shadow-xl shadow-emerald-500/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
                ENQUEUE (Add Photo)
              </button>
              <button 
                onClick={handleDequeue}
                disabled={uploadQueue.length === 0 || isProcessing}
                className="w-full py-4 bg-white border-2 border-emerald-600 rounded-2xl text-[11px] font-black text-emerald-600 flex items-center justify-center gap-2 hover:bg-emerald-50 disabled:opacity-30 transition-all active:scale-95"
              >
                <svg className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                DEQUEUE (Upload)
              </button>
            </div>
          </div>

          <div className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Sync Fairness</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Enqueue (Rear)</span>
                <span className="text-[10px] font-mono font-black text-emerald-600">$O(1)$</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Dequeue (Front)</span>
                <span className="text-[10px] font-mono font-black text-emerald-600">$O(1)$</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Peek Front</span>
                <span className="text-[10px] font-mono font-black text-emerald-600">$O(1)$</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4">
          <div className="bg-slate-900 rounded-[2rem] p-6 text-[10px] font-mono text-emerald-400 overflow-hidden shadow-2xl border border-slate-800">
            <p className="text-slate-500 mb-3 uppercase tracking-widest text-[9px] font-black">// QUEUE_CLASS</p>
            <p className="text-white">class SyncQueue {'{'}</p>
            <p className="pl-4 mt-2"><span className="text-pink-400">enqueue</span>(item) {'{'}</p>
            <p className="pl-8 text-slate-400 opacity-60">this.buffer.push(item);</p>
            <p className="pl-4">{'}'}</p>
            <p className="pl-4 mt-2"><span className="text-pink-400">dequeue</span>() {'{'}</p>
            <p className="pl-8 text-slate-400 opacity-60">return this.buffer.shift();</p>
            <p className="pl-4">{'}'}</p>
            <p className="text-white">{'}'}</p>
          </div>
          <div className="h-6 shrink-0" />
        </div>
      </div>

      {/* Visual Workspace - Fixed Stage, Scroll-Free */}
      <div className="flex-1 p-6 md:p-12 flex flex-col items-center justify-center h-full overflow-hidden bg-slate-50/30 relative">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12">Sync Buffer Conveyor Belt</h3>
        
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12 relative max-h-[60%] px-4">
          
          {/* Target: Cloud */}
          <div className="flex flex-col items-center gap-4 relative shrink-0">
             <div className={`w-28 h-28 md:w-36 md:h-36 rounded-[3.5rem] bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-500 shadow-inner relative transition-transform ${isProcessing ? 'scale-110' : ''} ring-[12px] ring-white`}>
                <svg className={`w-12 h-12 md:w-16 md:h-16 ${isProcessing ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full border-4 border-emerald-500 border-t-transparent rounded-[3.5rem] animate-spin" />
                  </div>
                )}
             </div>
             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Cloud Cluster</span>
          </div>

          {/* Conveyor Belt Area - Responsive sizing */}
          <div className="flex-1 max-w-2xl h-32 md:h-40 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-2xl relative flex items-center px-12 gap-6 overflow-hidden ring-[16px] ring-white/50">
             <div className="absolute inset-0 border-b-[10px] border-slate-50/50" />
             
             {uploadQueue.length === 0 && !isProcessing ? (
               <div className="flex-1 text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] animate-pulse">
                 Buffer Idle
               </div>
             ) : (
               <div className="flex items-center gap-6">
                 {uploadQueue.map((item, i) => (
                   <div 
                    key={item.id}
                    className={`relative shrink-0 w-20 h-20 md:w-28 md:h-28 bg-slate-50 rounded-2xl border-2 overflow-hidden shadow-xl transition-all duration-700 animate-in slide-in-from-right-20 ${
                      i === 0 
                      ? isProcessing ? '-translate-x-48 opacity-0 scale-75 blur-sm border-emerald-500' : 'border-emerald-400 scale-110 z-10 shadow-emerald-200/50 ring-4 ring-emerald-50' 
                      : 'border-slate-50 opacity-40 grayscale scale-90'
                    }`}
                   >
                     <img src={item.url} className="w-full h-full object-cover" />
                     {i === 0 && !isProcessing && (
                       <div className="absolute inset-0 bg-emerald-500/5 flex items-center justify-center">
                          <span className="text-[8px] font-black text-emerald-600 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-md uppercase tracking-widest border border-emerald-100">Front</span>
                       </div>
                     )}
                     {i === uploadQueue.length - 1 && (
                        <div className="absolute bottom-0 right-0 bg-slate-900 text-[7px] font-black text-white px-2 py-1 rounded-tl-xl uppercase tracking-widest">Rear</div>
                     )}
                   </div>
                 ))}
               </div>
             )}

             {/* Conveyor belt texture/indicators */}
             <div className="absolute bottom-1 left-0 right-0 h-1.5 flex justify-between px-4 opacity-20">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-6 h-1.5 bg-slate-400 rounded-full" />
                ))}
             </div>
          </div>
        </div>

        {/* Pointers Explanation - Horizontal profile */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl px-6">
           <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-xl transition-all hover:shadow-2xl group">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:scale-125 transition-transform" />
                 <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Head Pointer</h4>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                Tracks the oldest task. In a <b>Circular Buffer</b> implementation, this pointer cycles forward upon successful cloud ingestion.
              </p>
           </div>
           <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-xl transition-all hover:shadow-2xl group">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-3 h-3 rounded-full bg-slate-300 group-hover:bg-slate-900 group-hover:scale-125 transition-all" />
                 <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Tail Pointer</h4>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                Monitors the rear boundary. New uploads are appended at this index, maintaining strict <b>Temporal Fairness</b>.
              </p>
           </div>
        </div>

        <div className="mt-12 bg-white px-10 py-6 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.1)] flex items-center gap-8 max-w-xl group mx-6">
           <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-12 transition-transform">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
             </svg>
           </div>
           <div>
             <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-tight leading-none mb-1.5">Sequential Integrity</h4>
             <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
               Queues prevent <b>race conditions</b> by serializing destructive operations. The first intent is always the first effect.
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
