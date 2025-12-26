
import React, { useState, useEffect } from 'react';
import { Search, Cloud, Plus, Menu } from 'lucide-react'; 
import Sidebar from '../components/Sidebar';
import SnippetForm from '../components/SnippetForm';
import SnippetList from '../components/SnippetList';
import SnippetModal from '../components/SnippetModal';
import toast from 'react-hot-toast';

const API_BASE = 'https://codecache-m8yl.onrender.com/api/snippets';

export default function Dashboard({ username, handleLogout }) {
  // states
  const [snippets, setSnippets] = useState([]); 
  const [view, setView] = useState('list'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [activeSnippet, setActiveSnippet] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false); 

  const [formData, setFormData] = useState({ title: '', language: 'javascript', code: '', tags: '', note: '' });

 // fetch snippets
  const fetchSnippets = async () => {
    // If username is missing, don't fetch.
    if (!username) return; 

    try {
      const res = await fetch(`${API_BASE}?user=${username}`); 
      if (res.status === 400) {
         console.warn("Waiting for user login..."); 
         return;
      }
      if (!res.ok) throw new Error("Server error");
      
      const data = await res.json();
      setSnippets(data);
    } catch (err) { console.error(err); }
  };
  
  // Update useEffect to run whenever 'username' becomes available
  useEffect(() => { 
    if(username) fetchSnippets(); 
  }, [username]);

  useEffect(() => { fetchSnippets(); }, []); 

  // actions
  const handleSave = async () => {
    if (!formData.title || !formData.code) return toast.error("Title and Code are required!");
    setIsSaving(true); 

    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          tags: formData.tags.split(',').map(t => t.trim()).filter(t => t), 
          owner: username 
        })
      });

      if (res.ok) { 
        await fetchSnippets(); 
        setFormData({ title: '', language: 'javascript', code: '', tags: '', note: '' }); 
        setView('list'); 
        toast.success("Snippet saved successfully!");
      } else {
        toast.error("Failed to save.");
      }
    } catch (err) { 
      toast.error("Network Error: Backend unreachable."); 
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id) => {
    // trigger a confirmation 
    toast((t) => (
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-slate-200">
          Delete this snippet permanently?
        </span>
        <div className="flex gap-2 mt-1">
          {/* Confirm button */}
          <button 
            onClick={() => {
              toast.dismiss(t.id); // Close the toast
              performDelete(id);   // Run the actual delete
            }}
            className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-md transition-colors font-medium"
          >
            Yes, Delete
          </button>
          
          {/* Cancel Button */}
          <button 
            onClick={() => toast.dismiss(t.id)}
            className="bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs px-3 py-1.5 rounded-md transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 5000, 
      style: {
        background: '#0f172a',
        border: '1px solid #334155',
        color: '#fff',
      }
    });
  };

  //delete logic
  const performDelete = async (id) => {
    const oldSnippets = [...snippets]; 
    setSnippets(prev => prev.filter(s => s._id !== id)); 
    setActiveSnippet(null); 

    try { 
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' }); 
      if (!res.ok) throw new Error("Failed");
      toast.success("Snippet deleted."); 
    } catch (err) { 
      setSnippets(oldSnippets); // Undo if failed
      toast.error("Could not delete.");
    }
  };

  // Copy 
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  // filtering
  const filteredSnippets = snippets.filter(s => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = s.title.toLowerCase().includes(term) || (s.tags && s.tags.some(t => t.toLowerCase().includes(term)));
    const matchesTag = activeTag === 'All' || (s.tags && s.tags.includes(activeTag));
    return matchesSearch && matchesTag;
  });

  const allTags = ['All', ...new Set(snippets.flatMap(s => s.tags || []))];

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-200 font-sans">
     
      <Sidebar 
        username={username} 
        setView={setView} 
        activeTag={activeTag} 
        setActiveTag={setActiveTag} 
        allTags={allTags} 
        handleLogout={handleLogout}
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#0f172a]">
        
       
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center px-4 gap-4 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20 justify-between">
          
          {/* Left Side: Menu Button + Search */}
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>

            {/* Search Bar */}
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Search..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-sm focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-600" 
              />
            </div>
          </div>
          
        
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium items-center gap-2">
                <Cloud size={12} /> Sync
             </div>
             <div className="px-3 py-1.5 bg-slate-800 rounded-full text-slate-400 text-xs border border-slate-700 whitespace-nowrap">
                {snippets.length} <span className="hidden sm:inline">Snippets</span>
             </div>
          </div>
        </header>

        {/* Workspace */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700">
          {view === 'create' ? (
            <SnippetForm 
              formData={formData} 
              setFormData={setFormData} 
              handleSave={handleSave} 
              setView={setView} 
              isSaving={isSaving} 
            />
          ) : (
            <SnippetList 
              snippets={filteredSnippets} 
              handleCopy={handleCopy} 
              handleDelete={handleDelete} 
              onSnippetClick={(item) => setActiveSnippet(item)}
            />
          )}
        </div>

       
        {/* ensures mobile users can create snippets since sidebar is hidden */}
        <button
          onClick={() => setView('create')}
          className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-900/50 flex items-center justify-center transition-transform active:scale-95 z-50"
        >
          <Plus size={28} />
        </button>

      </main>

      <SnippetModal 
        snippet={activeSnippet} 
        onClose={() => setActiveSnippet(null)} 
      />
    </div>
  );
}