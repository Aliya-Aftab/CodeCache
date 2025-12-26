
import React from 'react';
import { Copy, Trash2, Database } from 'lucide-react';

export default function SnippetList({ 
  snippets = [], 
  handleCopy = () => {}, 
  handleDelete = () => {},
  onSnippetClick = () => {} // This is the prop from Dashboard
}) {
  const safeSnippets = Array.isArray(snippets) ? snippets : [];

  if (safeSnippets.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-50">
        <Database size={64} className="text-slate-700 mb-4" />
        <p className="text-slate-500">Database is empty.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
      {safeSnippets.map(item => (
        <div 
          key={item._id || Math.random()} 
          onClick={() => { 
             onSnippetClick(item);
          }}
          className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-black/50 flex flex-col h-[280px] cursor-pointer"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex justify-between items-start bg-slate-900/50">
            <div className="overflow-hidden">
              <h3 className="font-bold text-slate-200 group-hover:text-blue-400 truncate pr-2 transition-colors">
                {item.title || 'Untitled'}
              </h3>
              <div className="flex gap-2 mt-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase font-bold tracking-wider">
                  {item.language || 'text'}
                </span>
                {Array.isArray(item.tags) && item.tags.slice(0,2).map((t,i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-500 border border-slate-700">#{t}</span>
                ))}
              </div>
            </div>
            
            {/* Delete/Copy Buttons */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => { e.stopPropagation(); handleCopy(item.code || ''); }} 
                className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-blue-400"
              >
                <Copy size={16}/>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }} 
                className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-red-500"
              >
                <Trash2 size={16}/>
              </button>
            </div>
          </div>
          
          {/* Code Preview */}
          <div className="flex-1 bg-[#0B1120] p-4 overflow-hidden relative group-hover:bg-black transition-colors">
            <pre className="text-xs font-mono text-slate-400 leading-relaxed opacity-75 whitespace-pre-wrap break-words line-clamp-6">
              {item.code || '// No code content'}
            </pre> 
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#0B1120] to-transparent pointer-events-none group-hover:from-black"></div>
          </div>
        </div>
      ))}
    </div>
  );
}