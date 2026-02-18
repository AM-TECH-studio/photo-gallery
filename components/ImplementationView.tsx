
import React, { useState } from 'react';
import { DataStructureSection } from './DataStructureSection';
import { LinkedListView } from './visualizations/LinkedListView';
import { TreeView } from './visualizations/TreeView';
import { StackView } from './visualizations/StackView';
import { QueueView } from './visualizations/QueueView';
import { HashTableView } from './visualizations/HashTableView';
import { DetailedLinkedListView } from './visualizations/DetailedLinkedListView';
import { DetailedTreeView } from './visualizations/DetailedTreeView';
import { DetailedStackView } from './visualizations/DetailedStackView';
import { DetailedQueueView } from './visualizations/DetailedQueueView';
import { DetailedHashTableView } from './visualizations/DetailedHashTableView';

export const ImplementationView: React.FC = () => {
  const [focusedStructure, setFocusedStructure] = useState<string | null>(null);

  const closeModal = () => setFocusedStructure(null);

  return (
    <div className="relative px-2 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Doubly Linked List */}
        <div onClick={() => setFocusedStructure('linked-list')} className="cursor-pointer relative group">
          <div className="absolute top-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-8px] group-hover:translate-y-0">
            <div className="bg-blue-50 text-blue-600 border border-blue-100 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm flex items-center gap-2 backdrop-blur">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Open Lab
            </div>
          </div>
          <DataStructureSection 
            title="Linear Navigation" 
            structure="Doubly Linked List"
            description="Sequential browsing logic with constant-time neighbor access."
            complexity="O(1) Access"
          >
            <LinkedListView />
          </DataStructureSection>
        </div>

        {/* Tree Structure */}
        <div onClick={() => setFocusedStructure('tree')} className="cursor-pointer relative group">
          <div className="absolute top-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-8px] group-hover:translate-y-0">
            <div className="bg-amber-50 text-amber-600 border border-amber-100 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm flex items-center gap-2 backdrop-blur">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              Traverse
            </div>
          </div>
          <DataStructureSection 
            title="Nested Hierarchy" 
            structure="Tree Structure"
            description="Logical organization of folders and recursive directories."
            complexity="O(log N) Depth"
          >
            <TreeView />
          </DataStructureSection>
        </div>

        {/* Stack */}
        <div onClick={() => setFocusedStructure('stack')} className="cursor-pointer relative group">
          <div className="absolute top-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-8px] group-hover:translate-y-0">
            <div className="bg-violet-50 text-violet-600 border border-violet-100 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm flex items-center gap-2 backdrop-blur">
              <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
              Inspect Stack
            </div>
          </div>
          <DataStructureSection 
            title="Undo Memory" 
            structure="Stack (LIFO)"
            description="Tracks destructive actions for immediate restoration."
            complexity="LIFO: O(1)"
          >
            <StackView />
          </DataStructureSection>
        </div>

        {/* Queue */}
        <div onClick={() => setFocusedStructure('queue')} className="cursor-pointer relative group">
          <div className="absolute top-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-8px] group-hover:translate-y-0">
            <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm flex items-center gap-2 backdrop-blur">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Monitor
            </div>
          </div>
          <DataStructureSection 
            title="Upload Pipeline" 
            structure="Queue (FIFO)"
            description="Asynchronous task processing in the order received."
            complexity="FIFO: O(1)"
          >
            <QueueView />
          </DataStructureSection>
        </div>

        {/* Hash Table */}
        <div onClick={() => setFocusedStructure('hash-table')} className="md:col-span-2 cursor-pointer relative group">
          <div className="absolute top-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-8px] group-hover:translate-y-0">
            <div className="bg-blue-50 text-blue-600 border border-blue-100 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm flex items-center gap-2 backdrop-blur">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Trace Hash
            </div>
          </div>
          <DataStructureSection 
            title="Search Indexing" 
            structure="Hash Table"
            description="Near-instant retrieval of metadata and face recognition data."
            complexity="O(1) Constant"
          >
            <HashTableView />
          </DataStructureSection>
        </div>
      </div>

      {/* Modal Overlay for Focused Views */}
      {(focusedStructure !== null) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" onClick={closeModal} />
          <div className="relative bg-white w-full max-w-6xl h-[88vh] rounded-[2.5rem] shadow-[0_30px_100px_-15px_rgba(0,0,0,0.2)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 flex flex-col border border-white">
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/90 backdrop-blur text-slate-400 hover:bg-slate-950 hover:text-white transition-all z-[110] active:scale-90 border border-slate-100 group shadow-lg"
              aria-label="Close lab"
            >
              <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex-1 h-full overflow-hidden">
              {focusedStructure === 'linked-list' && <DetailedLinkedListView />}
              {focusedStructure === 'tree' && <DetailedTreeView />}
              {focusedStructure === 'stack' && <DetailedStackView />}
              {focusedStructure === 'queue' && <DetailedQueueView />}
              {focusedStructure === 'hash-table' && <DetailedHashTableView />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
