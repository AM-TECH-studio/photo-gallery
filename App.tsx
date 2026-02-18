
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ImplementationView } from './components/ImplementationView';
import { GalleryView } from './components/GalleryView';
import { PhotoProvider } from './context/PhotoContext';

const App: React.FC = () => {
  const [view, setView] = useState<'implementation' | 'gallery'>('implementation');

  return (
    <PhotoProvider>
      <div className="min-h-screen bg-white flex flex-col font-sans relative overflow-x-hidden">
        
        {/* Static Background Layer */}
        <div className="fixed inset-0 -z-20 overflow-hidden bg-white">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(#000000 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} 
          />
        </div>

        {/* Static Subtle Accents */}
        <div className="fixed top-[-10%] left-[-5%] w-[45%] h-[45%] bg-[#3B4AF9]/5 rounded-full blur-[160px] -z-10" />
        <div className="fixed bottom-[-10%] right-[-5%] w-[45%] h-[45%] bg-slate-100 rounded-full blur-[160px] -z-10" />

        <Header onSetView={setView} />
        
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-24 z-10">
          <div className="flex flex-col items-center mb-16 text-center">
            
            <h1 className="text-6xl md:text-8xl font-black text-black tracking-tight max-w-5xl leading-[0.9] mb-10">
              Visualizing the <br />
              <span className="text-[#3B4AF9]">Data Structures</span>
              <br />
              <span className="text-3xl md:text-5xl mt-6 block font-bold text-slate-400 tracking-tight leading-tight">
                Implementing a Modern Photo Gallery.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl leading-relaxed mb-14 px-4">
              A deep dive into the algorithmic engine of a professional media app. Analyze how doubly-linked lists, LIFO stacks, and hash maps optimize user navigation and data integrity at scale.
            </p>

            <div id="main-content" className="flex justify-center scroll-mt-32">
              <div className="bg-white/90 backdrop-blur-3xl p-3 rounded-[3rem] shadow-[0_32px_128px_-32px_rgba(0,0,0,0.1)] border border-slate-100 flex gap-4">
                <button 
                  onClick={() => setView('implementation')}
                  className={`px-12 py-5 rounded-[2.2rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-4 ${
                    view === 'implementation' 
                    ? 'bg-black text-white shadow-2xl shadow-black/20 scale-105' 
                    : 'text-slate-400 hover:text-black'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2 1m0 0L10 4m2 1v2.5M4 7l2-1M4 7l2 1M4 7v2.5M10 21l-2-1m2 1l2-1m-2 1v-2.5M20 18l-2 1m2-1l-2-1m2 1v2.5" />
                  </svg>
                  Simulation
                </button>
                <button 
                  onClick={() => setView('gallery')}
                  className={`px-12 py-5 rounded-[2.2rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-4 ${
                    view === 'gallery' 
                    ? 'bg-[#3B4AF9] text-white shadow-2xl shadow-[#3B4AF9]/20 scale-105' 
                    : 'text-slate-400 hover:text-black'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Interface
                </button>
              </div>
            </div>
          </div>

          <div className="relative pt-8">
             {view === 'implementation' ? <ImplementationView /> : <GalleryView />}
          </div>
        </main>

        <Footer />
      </div>
    </PhotoProvider>
  );
};

export default App;
