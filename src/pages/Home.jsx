import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';

function Home() {
  const [emailSelf, setEmailSelf] = useState('');

  const getEmail = async()=>{
    
    try {
      const token = getCookie("accessToken");

      const response = await fetch('http://localhost:4000/users/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Não foi possivel obter o e-mail.');
      }

      const data = await response.json();
      setEmailSelf(data.email);
    } catch (error) {
      window.location.href = "/login";
    }
  }

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
  };

  const logout = () => {
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.replace("/login");
  };
  
  getEmail();

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="flex justify-end p-4">
        <button
        onClick={logout}
          className="flex items-center justify-center p-2 bg-white text-blue-950 rounded-full hover:bg-gray-100 focus:outline-none transition duration-300"
        >
          <FiLogOut className="text-xl" />
        </button>
      </div>
      <div className="flex flex-grow flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-center">Bem-vindo à Leveling</h1>
        <p className="text-sm text-gray-300 mt-2">{emailSelf}</p>
      </div>
    </div>
  );
}

export default Home;