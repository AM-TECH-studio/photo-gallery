
import React from 'react';
import { usePhotos } from '../../context/PhotoContext';

export const QueueView: React.FC = () => {
  const { uploadQueue } = usePhotos();

  return (
    <div className="flex items-center gap-4 w-full justify-center relative py-6">
      
      {/* Simulation Packet (Moving through the FIFO pipeline) */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <div className="animate-queue-flow absolute top-1/2 -translate-y-1/2 w-10 h-10 border-2 border-dashed border-emerald-400 rounded-lg bg-emerald-50/50 flex items-center justify-center">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      {/* Target (S3 Bucket) */}
      <div className="flex flex-col items-center gap-2 group relative">
         <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center border-2 border-emerald-100 text-emerald-500 shadow-inner group-hover:scale-110 transition-transform relative">
           <svg className={`w-10 h-10 ${uploadQueue.length > 0 ? 'animate-bounce' : 'animate-queue-bucket-pulse'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
           </svg>
           {/* Absorption Effect */}
           <div className="absolute inset-0 bg-emerald-400/20 rounded-2xl animate-ping opacity-0 group-hover:opacity-100" />
         </div>
         <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">S3 Bucket</span>
      </div>

      {/* Buffer Pipeline (Conveyor Belt) */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden min-w-[140px] justify-center ring-4 ring-slate-50">
        {/* Conveyor Belt Background Texture */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
          <div className="h-full w-[200%] bg-repeat-x animate-conveyor-belt" style={{ backgroundImage: 'linear-gradient(90deg, #3B4AF9 25%, transparent 25%, transparent 50%, #3B4AF9 50%, #3B4AF9 75%, transparent 75%, transparent 100%)', backgroundSize: '20px 100%' }} />
        </div>

        {uploadQueue.length > 0 ? (
          uploadQueue.slice(0, 3).map((photo, i) => (
            <div 
              key={photo.id} 
              className={`w-12 h-12 rounded-xl border-2 border-white shadow-md overflow-hidden transition-all duration-700 ${
                i === 0 ? 'scale-110 border-emerald-400 z-20 translate-x-1' : 'scale-90 opacity-40 -rotate-2 z-10'
              }`}
            >
              <img src={photo.url} alt="Queue" className="w-full h-full object-cover" />
              {i === 0 && <div className="absolute inset-0 bg-emerald-500/10 animate-pulse" />}
            </div>
          ))
        ) : (
          <div className="flex items-center gap-2 py-4">
            <div className="w-2 h-2 rounded-full bg-slate-200 animate-pulse" />
            <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest">Awaiting Packets</span>
            <div className="w-2 h-2 rounded-full bg-slate-200 animate-pulse delay-150" />
          </div>
        )}

        {/* Tail Indicator */}
        <div className="flex flex-col items-center px-2 border-l border-slate-50 ml-2">
          <div className="w-1 h-8 bg-slate-100 rounded-full" />
          <span className="text-[7px] text-slate-400 mt-1 uppercase font-black tracking-tighter">REAR</span>
        </div>
      </div>

      {/* Labeling/Status */}
      <div className="hidden lg:flex flex-col items-start gap-1">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors border ${uploadQueue.length > 0 ? 'text-emerald-500 bg-emerald-50 border-emerald-100' : 'text-slate-300 bg-slate-50 border-slate-100'}`}>
           <span className="text-[8px] font-black uppercase tracking-widest">FIFO Pipeline</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 text-slate-400">
           <div className="w-1.5 h-1.5 rounded-full bg-[#3B4AF9] animate-ping" />
           <span className="text-[8px] font-bold uppercase tracking-tighter">O(1) Enqueue</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes queueFlow {
          0% {
            left: 90%;
            opacity: 0;
            transform: translateY(-50%) scale(0.5);
          }
          10% {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
          80% {
            left: 15%;
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
          100% {
            left: 5%;
            opacity: 0;
            transform: translateY(-50%) scale(0.8);
          }
        }
        @keyframes conveyorBelt {
          from { transform: translateX(0); }
          to { transform: translateX(-40px); }
        }
        @keyframes bucketPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        .animate-queue-flow {
          animation: queueFlow 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .animate-conveyor-belt {
          animation: conveyorBelt 2s linear infinite;
        }
        .animate-queue-bucket-pulse {
          animation: bucketPulse 3s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};
