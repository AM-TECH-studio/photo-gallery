
import React, { useEffect, useState } from 'react';
import { usePhotos } from '../context/PhotoContext';

export const GalleryView: React.FC = () => {
  const { 
    filteredPhotos, 
    recycleBin, 
    uploadQueue, 
    albums, 
    deletePhoto, 
    undoDelete, 
    uploadPhoto, 
    processUpload,
    searchQuery,
    setSearchQuery 
  } = usePhotos();

  const [activeAlbum, setActiveAlbum] = useState('all');

  useEffect(() => {
    if (uploadQueue.length > 0) {
      const timer = setTimeout(processUpload, 2000);
      return () => clearTimeout(timer);
    }
  }, [uploadQueue, processUpload]);

  const displayPhotos = activeAlbum === 'all' 
    ? filteredPhotos 
    : filteredPhotos.filter(p => p.album === activeAlbum);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-white/80 backdrop-blur-3xl rounded-[3.5rem] border border-white shadow-[0_32px_128px_-32px_rgba(0,0,0,0.1)] overflow-hidden max-w-6xl mx-auto flex flex-col min-h-[850px]">
        
        {/* Premium App Bar */}
        <div className="p-10 md:p-14 flex flex-col md:flex-row items-end md:items-center justify-between gap-10 border-b border-slate-50">
          <div className="space-y-3">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Photostream</h2>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Hash Index: Active</span>
              </div>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{displayPhotos.length} Objects</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-5 w-full md:w-auto">
             <div className="relative group flex-1 md:w-80">
               <input 
                type="text" 
                placeholder="Query indices (e.g. 'nature')..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4.5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-600 transition-all shadow-inner"
               />
               <svg className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
               {searchQuery && (
                 <div className="absolute top-1/2 -translate-y-1/2 right-4 text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 shadow-sm animate-in zoom-in-90">
                   $O(1)
                 </div>
               )}
             </div>

             <div className="flex items-center gap-4">
               <button 
                onClick={undoDelete}
                disabled={recycleBin.length === 0}
                className={`p-5 rounded-2xl transition-all flex items-center gap-3 group border-2 ${
                  recycleBin.length > 0 
                  ? 'bg-white border-indigo-600 text-indigo-600 hover:bg-indigo-50 active:scale-95 shadow-xl shadow-indigo-100' 
                  : 'bg-slate-50 border-transparent text-slate-300'
                }`}
               >
                 <svg className="w-5 h-5 group-hover:-rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                 </svg>
                 {recycleBin.length > 0 && <span className="text-sm font-black tracking-tight">Undo ({recycleBin.length})</span>}
               </button>

               <button 
                onClick={() => uploadPhoto('https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80')}
                className="p-5 bg-slate-950 text-white rounded-2xl hover:bg-blue-600 shadow-2xl shadow-slate-950/10 active:scale-95 transition-all flex items-center gap-3"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                 </svg>
                 <span className="text-sm font-black tracking-widest uppercase hidden sm:inline">Upload</span>
               </button>
             </div>
          </div>
        </div>

        {/* Dynamic Category Navigation */}
        <div className="px-10 py-8 flex gap-6 overflow-x-auto no-scrollbar scroll-smooth">
          <AlbumCard 
            icon="✨" 
            label="Library" 
            count={filteredPhotos.length.toString()} 
            active={activeAlbum === 'all'} 
            onClick={() => setActiveAlbum('all')}
          />
          {albums.map(album => (
            <AlbumCard 
              key={album.id}
              icon={album.icon} 
              label={album.name} 
              count={filteredPhotos.filter(p => p.album === album.id).length.toString()} 
              active={activeAlbum === album.id} 
              onClick={() => setActiveAlbum(album.id)}
            />
          ))}
        </div>

        {/* Enhanced Image Grid */}
        <div className="flex-1 p-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 overflow-y-auto bg-slate-50/30">
          {displayPhotos.length > 0 ? (
            displayPhotos.map((photo, i) => (
              <div 
                key={photo.id} 
                className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-white shadow-xl hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 hover:-translate-y-4 border border-white"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <img src={photo.url} alt="Photo" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115 grayscale hover:grayscale-0" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <div className="space-y-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <div className="flex flex-wrap gap-2">
                      {photo.tags.map(t => (
                        <span key={t} className="text-[10px] bg-white/10 backdrop-blur-xl px-3 py-1.5 rounded-xl text-white font-black uppercase tracking-widest border border-white/10">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Index ID</span>
                        <span className="text-sm font-bold text-white tracking-tight">#{photo.id}</span>
                      </div>
                      <button 
                        onClick={() => deletePhoto(photo.id)}
                        className="p-4 bg-red-600 rounded-2xl text-white hover:bg-red-700 transition-colors shadow-2xl shadow-red-500/40 active:scale-90"
                        title="Stack Push (LIFO)"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-40 text-slate-300">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
                <svg className="w-12 h-12 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-xl font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Null Index Response</p>
              <p className="text-sm font-semibold text-slate-300 uppercase tracking-widest">No entries found for this hash</p>
            </div>
          )}
        </div>

        {/* Task Monitoring Overlay */}
        {uploadQueue.length > 0 && (
          <div className="bg-slate-950 px-12 py-8 flex items-center justify-between text-white animate-in slide-in-from-bottom-full duration-700">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-40" />
                <div className="w-4 h-4 bg-blue-600 rounded-full absolute inset-0 shadow-[0_0_20px_rgba(37,99,235,0.6)]" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-[0.3em] block text-blue-400 mb-1">Queue Pipeline (FIFO)</span>
                <span className="text-lg font-black tracking-tight">{uploadQueue.length} Objects Pending Cloud Ingestion</span>
              </div>
            </div>
            
            <div className="flex items-center gap-10">
              <div className="hidden lg:flex flex-col items-end border-r border-white/10 pr-10">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Concurrency</span>
                <span className="text-xs font-mono font-bold text-white">1:1 Sequential</span>
              </div>
              <div className="flex -space-x-5">
                 {uploadQueue.slice(0, 4).map((q, idx) => (
                   <div key={q.id} className="w-14 h-14 rounded-2xl border-4 border-slate-950 overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 cursor-pointer" style={{ zIndex: 10 - idx }}>
                     <img src={q.url} className="w-full h-full object-cover" />
                   </div>
                 ))}
                 {uploadQueue.length > 4 && (
                   <div className="w-14 h-14 rounded-2xl bg-slate-900 border-4 border-slate-950 flex items-center justify-center text-xs font-black text-slate-500 relative z-0">
                     +{uploadQueue.length - 4}
                   </div>
                 )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AlbumCard: React.FC<{ icon: string; label: string; count: string; active?: boolean; onClick: () => void }> = ({ icon, label, count, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`shrink-0 flex items-center gap-5 px-8 py-5 rounded-[2rem] transition-all duration-500 border-2 ${
      active 
      ? 'bg-slate-950 text-white border-slate-950 shadow-2xl shadow-slate-950/20 scale-105 z-10' 
      : 'bg-white text-slate-400 border-slate-50 hover:border-slate-200 hover:shadow-xl hover:text-slate-900'
    }`}
  >
    <span className="text-3xl filter transition-all group-hover:scale-110">{icon}</span>
    <div className="text-left">
      <div className="text-[13px] font-black tracking-widest leading-none uppercase">{label}</div>
      <div className={`text-[10px] font-black mt-2 opacity-60 ${active ? 'text-blue-200' : 'text-slate-400'}`}>{count} Nodes</div>
    </div>
  </button>
);
