import React from 'react';
import { X, Copy, Code } from 'lucide-react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function SnippetModal({ snippet, onClose }) {
  if (!snippet) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      
      <div 
        className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-950/50">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code className="text-blue-500" /> {snippet.title}
            </h2>
            <div className="flex gap-2 mt-2">
               <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20 uppercase">
                 {snippet.language}
               </span>
            </div>
          </div>
          
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* The Code Body */}
        <div className="p-0 bg-[#0B1120] relative group">
          
          {/* Copy Button */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button 
              onClick={() => navigator.clipboard.writeText(snippet.code)}
              className="flex items-center gap-2 bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs hover:bg-blue-600 hover:text-white transition-all shadow-lg border border-slate-700"
            >
              <Copy size={14} /> Copy
            </button>
          </div>
          
          {/*Highlighter Component */}
          <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 text-sm">
            <SyntaxHighlighter 
              language={snippet.language || 'javascript'} 
              style={atomDark}
              customStyle={{ 
                background: 'transparent', 
                padding: '2rem', 
                margin: 0 
              }}
              showLineNumbers={true}
              wrapLongLines={true}
            >
              {snippet.code}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Footer */}
        {snippet.note && (
          <div className="p-6 bg-slate-900 border-t border-slate-800">
            <p className="text-slate-400 text-sm italic">" {snippet.note} "</p>
          </div>
        )}
      </div>
    </div>
  );
}