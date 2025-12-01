import React from 'react';
import { Terminal, X, Save } from 'lucide-react';

export default function SnippetForm({ 
  formData = { title: '', language: 'javascript', code: '', tags: '', note: '' }, 
  setFormData = () => {}, 
  handleSave = () => {}, 
  setView = () => {} 
}) {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Terminal className="text-blue-500" /> Add to Database
        </h2>
        <button onClick={() => setView('list')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
            <input 
              name="title" 
              value={formData.title || ''} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              className="w-full bg-slate-950 p-3 rounded-lg border border-slate-800 focus:border-blue-500 outline-none transition-colors text-white" 
              placeholder="Algorithm Name" 
            />
          </div>
          <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Language</label>
              <select name="language" value={formData.language || 'javascript'} onChange={e => setFormData({...formData, language: e.target.value})} className="w-full bg-slate-950 p-3 rounded-lg border border-slate-800 focus:border-blue-500 outline-none text-slate-300">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="html">HTML</option>
              </select>
          </div>
        </div>

        <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Code</label>
            <textarea 
              name="code" 
              value={formData.code || ''} 
              onChange={e => setFormData({...formData, code: e.target.value})} 
              className="w-full h-64 bg-[#0B1120] p-4 rounded-lg font-mono text-sm border border-slate-800 focus:border-blue-500 outline-none text-blue-100 leading-relaxed resize-none" 
              placeholder="// Paste code here..." 
            />
        </div>

        <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Tags</label>
            <input 
              name="tags" 
              value={formData.tags || ''} 
              onChange={e => setFormData({...formData, tags: e.target.value})} 
              className="w-full bg-slate-950 p-3 rounded-lg border border-slate-800 focus:border-blue-500 outline-none text-white" 
              placeholder="react, hooks, auth..." 
            />
        </div>

        <div className="pt-2 flex gap-3">
          <button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg flex justify-center items-center gap-2 transition-all">
            <Save size={18} /> Save to Database
          </button>
        </div>
      </div>
    </div>
  );
}