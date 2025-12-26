import React from 'react';
import LoginScreen from '../components/LoginScreen'; 


export default function Login({ handleAuth, loading }) {
  return (
    <LoginScreen 
      handleAuth={handleAuth} 
      loading={loading}
    />
  );
}