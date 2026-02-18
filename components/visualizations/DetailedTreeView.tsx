
import React, { useState, useEffect } from 'react';
import { usePhotos } from '../../context/PhotoContext';

interface TreeNode {
  id: string;
  name: string;
  icon: string;
  children?: TreeNode[];
}

const SAMPLE_TREE: TreeNode = {
  id: 'root',
  name: 'Gallery Root',
  icon: '📁',
  children: [
    {
      id: 'family',
      name: 'Family',
      icon: '🏠',
      children: [
        { id: 'f-2023', name: '2023', icon: '📅' },
        { id: 'f-2024', name: '2024', icon: '📅', children: [
           { id: 'vacation-24', name: 'Summer Trip', icon: '☀️' }
        ] },
      ]
    },
    {
      id: 'work',
      name: 'Work',
      icon: '💻',
      children: [
        { id: 'projects', name: 'Projects', icon: '🛠️' },
        { id: 'office', name: 'Office', icon: '🏢' },
      ]
    },
    {
      id: 'vacation',
      name: 'Vacation',
      icon: '✈️',
      children: [
        { id: 'beach', name: 'Beach', icon: '🏖️' },
        { id: 'mountains', name: 'Mountains', icon: '🏔️' },
      ]
    }
  ]
};

export const DetailedTreeView: React.FC = () => {
  const { photos } = usePhotos();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('root');
  const [path, setPath] = useState<TreeNode[]>([SAMPLE_TREE]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const findNode = (node: TreeNode, id: string): TreeNode | null => {
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findNode(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleNodeClick = (node: TreeNode) => {
    if (node.id === selectedNodeId) return;
    
    setIsTransitioning(true);
    
    // Smooth transition delay to allow fade out
    setTimeout(() => {
      setSelectedNodeId(node.id);
      const nodeIdxInPath = path.findIndex(p => p.id === node.id);
      if (nodeIdxInPath !== -1) {
        setPath(path.slice(0, nodeIdxInPath + 1));
      } else {
        setPath(prev => [...prev, node]);
      }
      setIsTransitioning(false);
    }, 400);
  };

  const currentNode = findNode(SAMPLE_TREE, selectedNodeId) || SAMPLE_TREE;

  return (
    <div className="flex flex-col h-full bg-white md:flex-row overflow-hidden no-scrollbar selection:bg-indigo-100 relative">
      {/* Visual Lab Sidebar */}
      <div className="w-full md:w-96 p-8 md:p-10 bg-white border-r border-slate-100 flex flex-col gap-10 shrink-0 z-20 h-full overflow-y-auto no-scrollbar shadow-[20px_0_60px_rgba(0,0,0,0.02)]">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-indigo-600 rounded-full" />
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Tree Lab</h2>
          </div>
          <p className="text-sm text-slate-500 font-medium leading-relaxed opacity-80">Visualizing recursive memory hierarchies.</p>
        </div>

        <div className="space-y-6">
          {/* Informational Box in Sidebar */}
          <div className="bg-slate-950 p-8 rounded-[2.5rem] shadow-2xl flex flex-col gap-6 border border-slate-800 transition-all hover:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-amber-500 rounded-2xl text-slate-950 shrink-0 shadow-lg shadow-amber-500/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-black text-white tracking-tight leading-none">Hierarchical Efficiency</h4>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed opacity-90 uppercase tracking-wide">
              Nesting objects allows the engine to <span className="text-amber-500 font-bold">prune entire branches</span> during search, ensuring $O(\log N)$ scaling.
            </p>
          </div>

          {/* Code Section */}
          <div className="p-8 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100/60 shadow-sm relative overflow-hidden group">
            <h4 className="text-[10px] font-black text-indigo-700 uppercase tracking-[0.25em] mb-6">Recursive Traversal</h4>
            <div className="text-[11px] font-mono text-slate-800 bg-white/80 backdrop-blur p-6 rounded-2xl leading-relaxed border border-indigo-200/40 shadow-inner">
              <p><span className="text-indigo-600 font-bold">DFS</span>(node, target) {'{'}</p>
              <p className="pl-4">if (node.id === target) <span className="text-blue-500 font-bold">return</span> node;</p>
              <p className="pl-4 mt-1">for (child of node.children) {'{'}</p>
              <p className="pl-8 text-indigo-600">res = DFS(child, target);</p>
              <p className="pl-8">if (res) return res;</p>
              <p className="pl-4">{'}'}</p>
              <p>{'}'}</p>
            </div>
          </div>
        </div>

        {/* Dynamic Trace */}
        <div className="mt-auto">
          <div className="bg-slate-900 rounded-[2rem] p-6 text-[11px] font-mono text-emerald-400 overflow-hidden shadow-2xl border border-slate-800">
            <p className="text-slate-500 mb-4 tracking-[0.2em] text-[9px] font-black uppercase">// POINTER STACK</p>
            {path.map((p, i) => (
              <p key={p.id} className="pl-4 border-l-2 border-emerald-900/40 mb-1 py-1 group cursor-default">
                {i > 0 && "↳ "}
                <span className="text-white font-bold">{p.name}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Workspace - Fixed Stage, Scroll-Free */}
      <div className="flex-1 p-8 md:p-12 flex flex-col items-center justify-center h-full overflow-hidden relative bg-slate-50/20 no-scrollbar">
        
        {/* Clean Breadcrumbs - Elevated to avoid collision */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 w-full flex justify-center px-6">
          <div className="bg-white/90 backdrop-blur-2xl px-10 py-3.5 rounded-full border border-slate-200/60 shadow-2xl flex items-center gap-6 overflow-hidden max-w-full">
            {path.map((p, i) => (
              <React.Fragment key={p.id}>
                <button 
                  onClick={() => handleNodeClick(p)}
                  className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 whitespace-nowrap ${
                    i === path.length - 1 ? 'text-indigo-600 scale-105' : 'text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {p.name}
                </button>
                {i < path.length - 1 && (
                  <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Tree Stage - Animated Flow */}
        <div className={`relative w-full flex flex-col items-center gap-28 mt-24 transition-all duration-500 ease-out ${isTransitioning ? 'opacity-0 scale-90 blur-xl translate-y-8' : 'opacity-100 scale-100 blur-0 translate-y-0'}`}>
           
           {/* Parent (Active) Node - Singular Focus */}
           <div className="relative z-10 flex flex-col items-center">
              <div className="w-48 h-48 bg-white rounded-[4rem] border-4 border-indigo-600 shadow-[0_40px_100px_-20px_rgba(79,70,229,0.3)] flex flex-col items-center justify-center gap-4 transform transition-all hover:scale-105 duration-700 group ring-[16px] ring-indigo-50/50">
                 <span className="text-7xl group-hover:rotate-6 transition-transform duration-700 select-none drop-shadow-2xl">{currentNode.icon}</span>
                 <span className="text-[13px] font-black text-slate-900 uppercase tracking-[0.25em] leading-none select-none">{currentNode.name}</span>
                 
                 {/* Explicit Role Badge */}
                 <div className="absolute -bottom-5 bg-indigo-600 text-[10px] font-black text-white px-8 py-2.5 rounded-full uppercase tracking-[0.3em] shadow-2xl ring-4 ring-white select-none whitespace-nowrap">
                   Active Node
                 </div>
              </div>
              
              {/* Connector lines - Originating from Node Base */}
              {currentNode.children && currentNode.children.length > 0 && (
                <div className="absolute top-48 left-1/2 -translate-x-1/2 flex justify-center w-[800px] pointer-events-none h-28">
                  <svg className="w-full h-full" viewBox="0 0 800 112" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="treeLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#e2e8f0" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    {currentNode.children.map((_, idx) => {
                       const count = currentNode.children!.length;
                       const targetX = (800 / (count + 1)) * (idx + 1);
                       return (
                         <path 
                          key={idx}
                          d={`M400 0 C 400 56, ${targetX} 56, ${targetX} 112`} 
                          fill="none" 
                          stroke="url(#treeLineGrad)" 
                          strokeWidth="4" 
                          strokeLinecap="round" 
                          className="animate-in fade-in duration-1000"
                         />
                       );
                    })}
                  </svg>
                </div>
              )}
           </div>

           {/* Children Row - Interactive Slots */}
           <div className="flex flex-wrap justify-center gap-16 md:gap-20 w-full px-12 z-0">
             {currentNode.children ? currentNode.children.map((child, idx) => (
               <button 
                key={child.id}
                onClick={() => handleNodeClick(child)}
                className="group flex flex-col items-center gap-6 transition-all hover:scale-110 active:scale-95 relative flex-1 max-w-[150px]"
                style={{ transitionDelay: `${idx * 40}ms` }}
               >
                 <div className="w-32 h-32 bg-white rounded-[3.5rem] border-2 border-slate-100 shadow-xl group-hover:border-indigo-400 group-hover:shadow-indigo-200/40 flex items-center justify-center transition-all duration-700 relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50">
                    <span className="text-5xl relative z-10 filter group-hover:drop-shadow-lg transition-all">{child.icon}</span>
                 </div>
                 <div className="text-center w-full">
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest group-hover:text-indigo-600 transition-colors block truncate px-2">{child.name}</span>
                 </div>
                 {child.children && (
                   <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-500 text-white text-[14px] font-black rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-125 transition-all duration-500 border-2 border-white">
                     +
                   </div>
                 )}
               </button>
             )) : (
               <div className="flex flex-col items-center gap-6 py-20 opacity-20 w-full animate-pulse">
                  <div className="w-20 h-20 rounded-full border-4 border-dashed border-slate-300 flex items-center justify-center text-4xl">🍃</div>
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Leaf Terminal</span>
               </div>
             )}
           </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        /* Final Scrollbar Suppression for Infographic Cleanliness */
        ::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        * {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        /* Ensure no stray artifacts from browser defaults */
        button:focus {
          outline: none !important;
        }
        .no-scrollbar {
           -ms-overflow-style: none !important;
           scrollbar-width: none !important;
        }
      `}} />
    </div>
  );
};
