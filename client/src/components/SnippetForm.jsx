
import React from 'react';
import { Save, X, Code, Tag, FileText } from 'lucide-react';

export default function SnippetForm({ formData, setFormData, handleSave, setView, isSaving }) {
  
  // Helper to handle typing in inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Code className="text-blue-500" /> New Snippet
        </h2>
        <button 
          onClick={() => setView('list')} 
          className="text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* The Form Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="space-y-6">
          
          {/* Title Input */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title} 
              onChange={handleChange} 
              placeholder="e.g. Authentication Middleware"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
            />
          </div>

          {/* Language & Tags Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Language</label>
              <select 
                name="language"
                value={formData.language} 
                onChange={handleChange} 
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white outline-none"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="html">HTML/CSS</option>
                <option value="sql">SQL</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Tags</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" 
                  name="tags"
                  value={formData.tags} 
                  onChange={handleChange} 
                  placeholder="react, auth, hook (comma separated)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Code Editor Area */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Code Snippet</label>
            <div className="relative group">
              <textarea 
                name="code"
                value={formData.code} 
                onChange={handleChange} 
                placeholder="// Paste your code here..."
                className="w-full h-64 bg-[#0B1120] border border-slate-700 rounded-lg p-4 font-mono text-sm text-slate-300 focus:border-blue-500 outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Optional Note */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Note (Optional)</label>
            <div className="relative">
               <FileText className="absolute left-3 top-3 text-slate-500" size={16} />
               <textarea 
                  name="note"
                  value={formData.note} 
                  onChange={handleChange} 
                  placeholder="Add a quick description..."
                  className="w-full h-20 bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:border-blue-500 outline-none resize-none"
               />
            </div>
          </div>

          {/* Save Button */}
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : <><Save size={20} /> Save Snippet</>}
          </button>

        </div>
      </div>
    </div>
  );
}