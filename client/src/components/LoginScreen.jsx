import React from 'react';
import { Database, User, Server, Lock } from 'lucide-react';

export default function LoginScreen({ username, setUsername, handleLogin, loading }) {
  return (
    <div className="flex h-screen items-center justify-center bg-[#0B1120] text-slate-200 font-sans relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md p-8 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-900/50 mb-4">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">CodeCache</h1>
          <p className="text-slate-400 mt-2 text-sm">Full Stack MERN Library</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Developer ID</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Enter your name..."
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-[0.98]"
          >
            {loading ? (
              <>
                <Server className="animate-spin" size={18} /> Connecting...
              </>
            ) : (
              <>
                Connect to Database <Lock size={16} />
              </>
            )}
          </button>
        </form>
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span>MongoDB Connected • v1.0.0</span>
        </div>
      </div>
    </div>
  );
}