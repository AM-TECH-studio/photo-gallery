
import React from 'react';

interface Props {
  title: string;
  structure: string;
  description: string;
  complexity: string;
  children: React.ReactNode;
}

export const DataStructureSection: React.FC<Props> = ({ title, structure, description, complexity, children }) => {
  return (
    <section className="group bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-2 h-full">
      <div className="p-10 pb-8 flex flex-col min-h-[200px] relative z-10 bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{structure}</h3>
          </div>
          <div className="px-3 py-1 bg-black rounded-lg transition-all group-hover:bg-[#3B4AF9] duration-500">
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
              {complexity}
            </span>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-black text-black tracking-tight mb-2 group-hover:text-[#3B4AF9] transition-colors duration-500">{title}</h2>
          <p className="text-slate-500 text-[14px] font-medium leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity line-clamp-2">{description}</p>
        </div>
      </div>
      
      {/* Structural Visualization Area */}
      <div className="flex-1 bg-[#F1F1F4] min-h-[320px] flex flex-col items-center justify-center p-10 group-hover:bg-[#F6F7F9] transition-all duration-700 border-t border-slate-200 relative overflow-hidden shadow-[inset_0_4px_24px_rgba(0,0,0,0.04)]">
        
        {/* Subtle Machined Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '12px 12px' }} 
        />
        
        {/* Visualization Content Container */}
        <div className="w-full flex justify-center scale-95 group-hover:scale-100 transition-transform duration-700 ease-out h-full items-center relative z-10">
          {children}
        </div>

        {/* Dynamic Structural Accents */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
           <div className="w-8 h-1 bg-slate-400 rounded-full" />
           <div className="w-2 h-1 bg-slate-400 rounded-full" />
        </div>
      </div>
    </section>
  );
};
