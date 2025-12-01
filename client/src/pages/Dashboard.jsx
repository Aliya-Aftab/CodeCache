// import React, { useState, useEffect } from 'react';
// import { Search, Cloud } from 'lucide-react';
// import Sidebar from '../components/Sidebar';
// import SnippetForm from '../components/SnippetForm';
// import SnippetList from '../components/SnippetList';

// const API_BASE = 'http://localhost:5000/api/snippets';

// export default function Dashboard({ username, handleLogout }) {
//   const [snippets, setSnippets] = useState([]); 
//   const [view, setView] = useState('list'); 
//   const [searchTerm, setSearchTerm] = useState('');
//   // Add this new state variable

//   const [activeTag, setActiveTag] = useState('All');
//   const [formData, setFormData] = useState({ title: '', language: 'javascript', code: '', tags: '', note: '' });

//   // FETCH: Send username to get specific data for this user
//   const fetchSnippets = async () => {
//     try {
//       const res = await fetch(`${API_BASE}?user=${username}`);
//       if (!res.ok) throw new Error("Server Error");
//       const data = await res.json();
//       setSnippets(data);
//     } catch (err) { console.error("Failed to fetch:", err); }
//   };

//   useEffect(() => { fetchSnippets(); }, []);

//   // SAVE: Send data + owner name to database
//   const handleSave = async () => {
//     if (!formData.title || !formData.code) return alert("Title required");
//     try {
//       const res = await fetch(API_BASE, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           ...formData, 
//           tags: formData.tags.split(',').map(t => t.trim()).filter(t => t), 
//           owner: username 
//         })
//       });
//       if (res.ok) { 
//         await fetchSnippets(); 
//         setFormData({ title: '', language: 'javascript', code: '', tags: '', note: '' }); 
//         setView('list'); 
//       }
//     } catch (err) { alert("Error saving"); }
//   };

//   // DELETE
//   const handleDelete = async (id) => {
//     if (window.confirm("Delete?")) {
//       try { 
//         await fetch(`${API_BASE}/${id}`, { method: 'DELETE' }); 
//         setSnippets(prev => prev.filter(s => s._id !== id)); 
//       } catch (err) { alert("Failed"); }
//     }
//   };

//   const handleCopy = (text) => navigator.clipboard.writeText(text);

//   // Client-side Filtering Logic
//   const filteredSnippets = snippets.filter(s => {
//     const term = searchTerm.toLowerCase();
//     const matchesSearch = s.title.toLowerCase().includes(term) || (s.tags && s.tags.some(t => t.toLowerCase().includes(term)));
//     const matchesTag = activeTag === 'All' || (s.tags && s.tags.includes(activeTag));
//     return matchesSearch && matchesTag;
//   });

//   // Extract unique tags for sidebar
//   const allTags = ['All', ...new Set(snippets.flatMap(s => s.tags || []))];

//   return (
//     <div className="flex h-screen bg-[#0f172a] text-slate-200 font-sans">
//       <Sidebar 
//         username={username} 
//         setView={setView} 
//         activeTag={activeTag} 
//         setActiveTag={setActiveTag} 
//         allTags={allTags} 
//         handleLogout={handleLogout} 
//       />
      
//       <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#0f172a]">
//         {/* Top Header */}
//         <header className="h-16 border-b border-slate-800 flex items-center px-6 justify-between bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
//           <div className="relative w-96 group">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
//             <input 
//               value={searchTerm} 
//               onChange={(e) => setSearchTerm(e.target.value)} 
//               placeholder="Search library..." 
//               className="w-full bg-slate-950 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-sm focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-600" 
//             />
//           </div>
//           <div className="flex items-center gap-3">
//              <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium flex items-center gap-2">
//                 <Cloud size={12} /> Sync Active
//              </div>
//              <div className="px-3 py-1.5 bg-slate-800 rounded-full text-slate-400 text-xs border border-slate-700">
//                 {snippets.length} Snippets
//              </div>
//           </div>
//         </header>

//         {/* Main Workspace */}
//         <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700">
//           {view === 'create' ? (
//             <SnippetForm 
//               formData={formData} 
//               setFormData={setFormData} 
//               handleSave={handleSave} 
//               setView={setView} 
//             />
//           ) : (
//             <SnippetList 
//               snippets={filteredSnippets} 
//               handleCopy={handleCopy} 
//               handleDelete={handleDelete} 
//             />
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }






import React, { useState, useEffect } from 'react';
import { Search, Cloud, Server } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import SnippetForm from '../components/SnippetForm';
import SnippetList from '../components/SnippetList';

const API_BASE = 'https://codecache-m8yl.onrender.com/api/snippets';

export default function Dashboard({ username, handleLogout }) {
  // --- STATE ---
  const [snippets, setSnippets] = useState([]); 
  const [view, setView] = useState('list'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  
  const [isSaving, setIsSaving] = useState(false); // Manages button state
  
  const [formData, setFormData] = useState({ title: '', language: 'javascript', code: '', tags: '', note: '' });

  // --- FETCH: Applies Privacy Filter ---
  const fetchSnippets = async () => {
    try {
      // CRITICAL: Sends the username to the server to filter data (Data Isolation)
      const res = await fetch(`${API_BASE}?user=${username}`); 
      if (!res.ok) throw new Error(`Server returned status: ${res.status}`);
      const data = await res.json();
      setSnippets(data);
    } catch (err) { console.error("Failed to fetch:", err); }
  };

  useEffect(() => { fetchSnippets(); }, []); // Run once on component load

  // --- ACTIONS ---
  const handleSave = async () => {
    if (!formData.title || !formData.code) return alert("Title required");
    
    setIsSaving(true); // START Loading state

    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          tags: formData.tags.split(',').map(t => t.trim()).filter(t => t), 
          owner: username // CRITICAL: Tags the snippet with the current user
        })
      });

      if (res.ok) { 
        await fetchSnippets(); // Refresh list to show new snippet
        setFormData({ title: '', language: 'javascript', code: '', tags: '', note: '' }); 
        setView('list'); 
      } else {
        alert("Save Failed: Server returned an error.");
      }
    } catch (err) { 
      alert("Network Error: Could not connect to the database server."); 
    } finally {
      setIsSaving(false); // STOP Loading state regardless of success/failure
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this from the database?")) {
      try { 
        const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' }); 
        
        if (!res.ok) {
            console.error('DELETE FAILED. Server Response Status:', res.status);
            alert("Delete failed. Check server log.");
            return;
        }

        setSnippets(prev => prev.filter(s => s._id !== id)); // Optimistic UI Update
      } catch (err) { 
        alert("Failed to connect to the server.");
      }
    }
  };

  const handleCopy = (text) => navigator.clipboard.writeText(text);

  // Client-side Filtering
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
      />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#0f172a]">
        {/* Header (Search Bar) */}
        <header className="h-16 border-b border-slate-800 flex items-center px-6 justify-between bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
          <div className="relative w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              placeholder="Search library..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-sm focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-600" 
            />
          </div>
          <div className="flex items-center gap-3">
             <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium flex items-center gap-2">
                <Cloud size={12} /> Sync Active
             </div>
             <div className="px-3 py-1.5 bg-slate-800 rounded-full text-slate-400 text-xs border border-slate-700">
                {snippets.length} Snippets
             </div>
          </div>
        </header>

        {/* Workspace */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700">
          {view === 'create' ? (
            // Pass the new isSaving state to the form
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
            />
          )}
        </div>
      </main>
    </div>
  );
}