
import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Toaster, toast } from 'react-hot-toast';

//   Auth Routes
const API_BASE = 'https://codecache-m8yl.onrender.com/api'; 
// const API_BASE = 'http://localhost:5000/api';
export default function CodeCache() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('token') ? true : false);
  const [user, setUser] = useState(sessionStorage.getItem('user') || '');
  const [loading, setLoading] = useState(false);

  // ---AUTH HANDLER (Handles both Login and Register) ---
  const handleAuth = async (type, formData) => {
    // type is either 'login' or 'register'
    const endpoint = type === 'login' ? '/auth/login' : '/auth/register';
    
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Authentication failed");

      if (type === 'register') {
        toast.success("Account created! You can now login.");
        setLoading(false);
        return true; // Success flag
      } 
      
      // If Login Success:
      if (type === 'login') {
        sessionStorage.setItem('token', data.token); // Save the Key
        sessionStorage.setItem('user', data.username); // Save the Name
        setUser(data.username);
        setIsAuthenticated(true);
        toast.success("Welcome back!");
      }

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
    setUser(''); 
    toast.success("Logged out");
  };

  return (
    <>
      <Toaster 
  position="top-center" 
  toastOptions={{
    success: { icon: null },
    error: { icon: null },
    loading: { icon: null },
    style: {
      background: '#0f172a', 
      color: '#e2e8f0',      
      border: '1px solid #334155', 
      borderRadius: '4px',   
      padding: '12px 16px',
      fontSize: '13px',
      fontFamily: 'monospace', 
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
    },
  }}
/>

      {!isAuthenticated ? (
        <Login 
          handleAuth={handleAuth} // Passing the handler
          loading={loading} 
        />
      ) : (
        <Dashboard 
          username={user} 
          handleLogout={handleLogout} 
        />
      )}
    </>
  );
}