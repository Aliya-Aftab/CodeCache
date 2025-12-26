
import React, { useState } from 'react';
import { Database, Mail, Lock, Server, ArrowRight, UserPlus, LogIn } from 'lucide-react';

export default function LoginScreen({ handleAuth, loading }) {
  // Local State
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const type = isRegistering ? 'register' : 'login';
    // Call the parent function
    const success = await handleAuth(type, formData);
    
    // If registration was successful, switch to login view automatically
    if (isRegistering && success) {
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#0B1120] text-slate-200 font-sans relative overflow-hidden">
      
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
      
      <div className="w-full max-w-md p-8 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-900/50 mb-4">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">CodeCache</h1>
          <p className="text-slate-400 mt-2 text-sm">
            {isRegistering ? "Create your secure workspace" : "Your Second Brain for Code"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Field */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="developer@example.com"
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>
          
          {/* Main Action Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <> <Server className="animate-spin" size={18} /> Processing... </>
            ) : (
              <> 
                {isRegistering ? "Create Account" : "Access Workspace"} 
                <ArrowRight size={18} /> 
              </>
            )}
          </button>
        </form>

        {/* Toggle between Login/Register */}
        <div className="mt-6 pt-6 border-t border-slate-800 text-center">
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-sm text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2 w-full"
          >
            {isRegistering ? (
              <>Already have an account? <span className="text-blue-400 font-bold">Sign In</span></>
            ) : (
              <>Don't have an account? <span className="text-blue-400 font-bold">Sign Up</span></>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}