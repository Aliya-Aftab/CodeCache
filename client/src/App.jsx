// import React, { useState, useEffect } from 'react';
// import { 
//   Code, Trash2, Copy, Plus, Search, Tag, 
//   Terminal, Save, X, Database, LogOut, Lock, User, Server, Cloud
// } from 'lucide-react';

// // API URL ( Node Server)
// const API_BASE = 'http://localhost:5000/api/snippets';

// export default function CodeCache() {
//   // --- AUTH STATE ---
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     return localStorage.getItem('is_logged_in') === 'true';
//   });
//   const [username, setUsername] = useState(localStorage.getItem('username') || '');

//   // --- APP STATE ---
//   const [snippets, setSnippets] = useState([]); 
//   const [loading, setLoading] = useState(false);
//   const [view, setView] = useState('list'); 
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeTag, setActiveTag] = useState('All');

//   // --- FORM STATE ---
//   const [formData, setFormData] = useState({
//     title: '',
//     language: 'javascript',
//     code: '',
//     tags: '',
//     note: ''
//   });

//   // --- FETCH DATA (Updated for Private Mode) ---
//   const fetchSnippets = async () => {
//     try {
//       // SEND USERNAME to server so it knows whose data to get
//       const res = await fetch(`${API_BASE}?user=${username}`);
//       if (!res.ok) throw new Error("Server Error");
//       const data = await res.json();
//       setSnippets(data);
//     } catch (err) {
//       console.error("Failed to fetch:", err);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated) fetchSnippets();
//   }, [isAuthenticated]);

//   // --- HANDLERS ---
//   const handleLogin = (e) => {
//     e.preventDefault();
//     if(!username.trim()) return alert("Please enter a username");
    
//     setLoading(true);
//     setTimeout(() => {
//       localStorage.setItem('is_logged_in', 'true');
//       localStorage.setItem('username', username);
//       setIsAuthenticated(true);
//       // We call fetchSnippets immediately after setting auth to true
//       // But React state updates are async, so the useEffect above handles the initial load usually
//       // However, we can also force a reload or rely on the effect. 
//       // The effect dependency on [isAuthenticated] handles it.
//       setLoading(false);
//     }, 1000);
//   };

//   const handleLogout = () => {
//     if(confirm("Disconnect from server session?")) {
//       localStorage.removeItem('is_logged_in');
//       setIsAuthenticated(false);
//       setSnippets([]);
//       setView('list');
//     }
//   };

//   const handleSave = async () => {
//     if (!formData.title || !formData.code) return alert("Title and Code are required.");

//     try {
//       const res = await fetch(API_BASE, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...formData,
//           tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
//           owner: username // <--- CRITICAL: Saving the owner name
//         })
//       });

//       if (res.ok) {
//         await fetchSnippets();
//         setFormData({ title: '', language: 'javascript', code: '', tags: '', note: '' });
//         setView('list');
//       } else {
//         const errorData = await res.json();
//         alert("Save Failed: " + (errorData.error || "Unknown Error"));
//       }
//     } catch (err) {
//       alert("Database Connection Failed");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Permanently delete this from the database?")) {
//       try {
//         await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
//         setSnippets(prev => prev.filter(s => s._id !== id)); 
//       } catch (err) {
//         alert("Delete failed");
//       }
//     }
//   };

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   // --- FILTERING ---
//   const filteredSnippets = snippets.filter(s => {
//     const term = searchTerm.toLowerCase();
//     const matchesSearch = s.title.toLowerCase().includes(term) || 
//                           (s.tags && s.tags.some(t => t.toLowerCase().includes(term)));
//     const matchesTag = activeTag === 'All' || (s.tags && s.tags.includes(activeTag));
//     return matchesSearch && matchesTag;
//   });

//   const allTags = ['All', ...new Set(snippets.flatMap(s => s.tags || []))];

//   // --- RENDER ---
//   if (!isAuthenticated) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-[#0B1120] text-slate-200 font-sans relative overflow-hidden">
//         <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
//         <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]"></div>

//         <div className="w-full max-w-md p-8 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl relative z-10">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-900/50 mb-4">
//               <Database className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-white tracking-tight">CodeCache</h1>
//             <p className="text-slate-400 mt-2 text-sm">Full Stack MERN Library</p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-5">
//             <div>
//               <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Developer ID</label>
//               <div className="relative group">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
//                 <input 
//                   type="text" 
//                   placeholder="Enter your name..."
//                   className="w-full bg-slate-950/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
            
//             <button 
//               type="submit" 
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-[0.98]"
//             >
//               {loading ? (
//                 <>
//                   <Server className="animate-spin" size={18} /> Connecting...
//                 </>
//               ) : (
//                 <>
//                   Connect to Database <Lock size={16} />
//                 </>
//               )}
//             </button>
//           </form>
//           <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
//             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
//             <span>MongoDB Connected • v1.0.0</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-[#0f172a] text-slate-200 font-sans">
//       <aside className="w-64 bg-slate-950 border-r border-slate-800 hidden md:flex flex-col">
//         <div className="p-6 border-b border-slate-800 flex items-center gap-3">
//           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//             <Code className="text-white w-5 h-5" />
//           </div>
//           <span className="text-lg font-bold text-white tracking-tight">CodeCache</span>
//         </div>
//         <div className="p-4 flex-1 overflow-y-auto">
//           <button 
//             onClick={() => setView('create')}
//             className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all mb-6 font-medium shadow-lg shadow-blue-900/20"
//           >
//             <Plus size={18} /> New Snippet
//           </button>
//           <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Filters</div>
//           <div className="space-y-1">
//             {allTags.map(tag => (
//               <button
//                 key={tag}
//                 onClick={() => setActiveTag(tag)}
//                 className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
//                   activeTag === tag 
//                     ? 'bg-blue-900/30 text-blue-400 font-medium border border-blue-800/50' 
//                     : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
//                 }`}
//               >
//                 <Tag size={14} className={activeTag === tag ? "fill-blue-400/20" : ""} /> {tag}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="p-4 border-t border-slate-800">
//           <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
//                 {username.slice(0,2).toUpperCase()}
//               </div>
//               <div className="overflow-hidden">
//                 <div className="text-slate-200 text-sm font-medium truncate w-20">{username}</div>
//                 <div className="text-emerald-500 text-[10px] flex items-center gap-1">
//                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Online
//                 </div>
//               </div>
//             </div>
//             <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 transition-colors p-1.5 hover:bg-slate-800 rounded">
//               <LogOut size={16} />
//             </button>
//           </div>
//         </div>
//       </aside>

//       <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#0f172a]">
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

//         <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700">
//           {view === 'create' ? (
//             <div className="max-w-4xl mx-auto animate-fade-in">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-white flex items-center gap-3">
//                   <Terminal className="text-blue-500" /> Add to Database
//                 </h2>
//                 <button onClick={() => setView('list')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
//                   <X size={24} />
//                 </button>
//               </div>
//               <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl space-y-5">
//                 <div className="grid grid-cols-2 gap-5">
//                   <div className="space-y-1.5">
//                     <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
//                     <input name="title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-950 p-3 rounded-lg border border-slate-800 focus:border-blue-500 outline-none transition-colors text-white" placeholder="Algorithm Name" />
//                   </div>
//                   <div className="space-y-1.5">
//                      <label className="text-xs font-bold text-slate-500 uppercase">Language</label>
//                      <select name="language" value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})} className="w-full bg-slate-950 p-3 rounded-lg border border-slate-800 focus:border-blue-500 outline-none text-slate-300">
//                        <option value="javascript">JavaScript</option>
//                        <option value="python">Python</option>
//                        <option value="java">Java</option>
//                        <option value="cpp">C++</option>
//                        <option value="html">HTML</option>
//                      </select>
//                   </div>
//                 </div>
//                 <div className="space-y-1.5">
//                    <label className="text-xs font-bold text-slate-500 uppercase">Code</label>
//                    <textarea name="code" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="w-full h-64 bg-[#0B1120] p-4 rounded-lg font-mono text-sm border border-slate-800 focus:border-blue-500 outline-none text-blue-100 leading-relaxed resize-none" placeholder="// Paste code here..." />
//                 </div>
//                 <div className="space-y-1.5">
//                    <label className="text-xs font-bold text-slate-500 uppercase">Tags</label>
//                    <input name="tags" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-slate-950 p-3 rounded-lg border border-slate-800 focus:border-blue-500 outline-none text-white" placeholder="react, hooks, auth..." />
//                 </div>
//                 <div className="pt-2 flex gap-3">
//                   <button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg flex justify-center items-center gap-2 transition-all">
//                     <Save size={18} /> Save to Database
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
//               {filteredSnippets.length === 0 ? (
//                  <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-50">
//                     <Database size={64} className="text-slate-700 mb-4" />
//                     <p className="text-slate-500">Database is empty.</p>
//                  </div>
//               ) : (
//                 filteredSnippets.map(item => (
//                   <div key={item._id} className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-black/50 flex flex-col h-[280px]">
//                      <div className="p-4 border-b border-slate-800 flex justify-between items-start bg-slate-900/50">
//                         <div className="overflow-hidden">
//                            <h3 className="font-bold text-slate-200 group-hover:text-blue-400 truncate pr-2 transition-colors">{item.title}</h3>
//                            <div className="flex gap-2 mt-2">
//                              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase font-bold tracking-wider">{item.language}</span>
//                              {item.tags?.slice(0,2).map((t,i) => <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-500 border border-slate-700">#{t}</span>)}
//                            </div>
//                         </div>
//                         <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                            <button onClick={() => handleCopy(item.code)} className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-blue-400"><Copy size={16}/></button>
//                            <button onClick={() => handleDelete(item._id)} className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
//                         </div>
//                      </div>
//                      <div className="flex-1 bg-[#0B1120] p-4 overflow-hidden relative group-hover:bg-black transition-colors">
//                         <pre className="text-xs font-mono text-slate-400 leading-relaxed opacity-75">{item.code}</pre>
//                         <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#0B1120] to-transparent pointer-events-none group-hover:from-black"></div>
//                      </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }






// import React, { useState } from 'react';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';

// export default function CodeCache() {
//   // --- GLOBAL AUTH STATE ---
//   // Using sessionStorage ensures the user is logged out when they close the tab
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     return sessionStorage.getItem('is_logged_in') === 'true';
//   });
//   const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
//   const [loading, setLoading] = useState(false);

//   // --- GLOBAL HANDLERS ---
//   const handleLogin = (e) => {
//     e.preventDefault();
//     if(!username.trim()) return alert("Enter username");
    
//     setLoading(true);
//     // Simulate secure handshake delay
//     setTimeout(() => {
//       sessionStorage.setItem('is_logged_in', 'true');
//       sessionStorage.setItem('username', username);
//       setIsAuthenticated(true);
//       setLoading(false);
//     }, 1000);
//   };

//   const handleLogout = () => {
//     if(confirm("Disconnect from server session?")) {
//       sessionStorage.clear();
//       setIsAuthenticated(false);
//       setUsername(''); // Clear username from state for security
//     }
//   };

//   // --- ROUTING LOGIC ---
//   if (!isAuthenticated) {
//     return (
//       <Login 
//         username={username} 
//         setUsername={setUsername} 
//         handleLogin={handleLogin} 
//         loading={loading} 
//       />
//     );
//   }

//   return (
//     <Dashboard 
//       username={username} 
//       handleLogout={handleLogout} 
//     />
//   );
// }



import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function CodeCache() {
  // --- GLOBAL AUTH STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('is_logged_in') === 'true';
  });
  const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
  const [loading, setLoading] = useState(false);

  // --- GLOBAL HANDLERS (Passed down to Pages) ---
  const handleLogin = (e) => {
    e.preventDefault();
    if(!username.trim()) return alert("Enter username");
    
    setLoading(true);
    setTimeout(() => {
      sessionStorage.setItem('is_logged_in', 'true');
      sessionStorage.setItem('username', username);
      setIsAuthenticated(true);
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    // FIX: Removed native 'confirm()' and replaced it with direct session clear
    // This makes the log out action immediate and smooth.
    sessionStorage.clear();
    setIsAuthenticated(false);
    setUsername(''); 
  };

  // --- ROUTING LOGIC ---
  if (!isAuthenticated) {
    return (
      <Login 
        username={username} 
        setUsername={setUsername} 
        handleLogin={handleLogin} 
        loading={loading} 
      />
    );
  }

  return (
    <Dashboard 
      username={username} 
      handleLogout={handleLogout} 
    />
  );
}