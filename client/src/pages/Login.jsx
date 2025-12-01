import React from 'react';
import LoginScreen from '../components/LoginScreen'; 

export default function Login({ username, setUsername, handleLogin, loading }) {
  return (
    <LoginScreen 
      username={username}
      setUsername={setUsername}
      handleLogin={handleLogin}
      loading={loading}
    />
  );
}