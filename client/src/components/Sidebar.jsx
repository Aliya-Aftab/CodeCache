
import React from 'react';
import { Code, Plus, Tag, LogOut, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Sidebar({ 
  username = "Developer", 
  setView, 
  activeTag, 
  setActiveTag, 
  allTags = [], 
  handleLogout,
  isOpen,   
  onClose 
}) {
  const safeUsername = typeof username === 'string' ? username : "Developer";

  return (
    <>      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm animate-in fade-in duration-200"
          onClick={onClose} // Clicking background closes sidebar
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
      `}>
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Code className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">CodeCache</span>
          </div>
          
         
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto">
          <button 
            onClick={() => {
              if (setView) setView('create');
              if (onClose) onClose(); // Close sidebar on mobile after clicking
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all mb-6 font-medium shadow-lg shadow-blue-900/20"
          >
            <Plus size={18} /> New Snippet
          </button>

          {/* Filters */}
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Filters</div>
          <div className="space-y-1">
            {Array.isArray(allTags) && allTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  if (setActiveTag) setActiveTag(tag);
                  if (onClose) onClose();
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                  activeTag === tag 
                    ? 'bg-blue-900/30 text-blue-400 font-medium border border-blue-800/50' 
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <Tag size={14} className={activeTag === tag ? "fill-blue-400/20" : ""} /> {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* Footer with Logout */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                {safeUsername.slice(0,2).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <div className="text-slate-200 text-sm font-medium truncate w-20">{safeUsername}</div>
                <div className="text-emerald-500 text-[10px] flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Online
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => {
                 toast((t) => (
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold text-slate-200">Log out?</span>
                    <div className="flex gap-2 mt-1">
                      <button 
                        onClick={() => {
                          toast.dismiss(t.id);
                          handleLogout();
                    
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-md font-medium"
                      >
                        Yes
                      </button>
                      <button 
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs px-3 py-1.5 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ), {
                  duration: 4000,
                  style: { background: '#0f172a', border: '1px solid #334155', color: '#fff' }
                });
              }}
              className="text-slate-500 hover:text-red-400 transition-colors p-1.5 hover:bg-slate-800 rounded"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}