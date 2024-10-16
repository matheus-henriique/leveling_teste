import React, { useState } from 'react';
import { FiLoader } from "react-icons/fi";
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import logo from '../assets/logo_leveling.webp';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggingIn, setLogingIn] = useState(false);
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const expirationDate = new Date(Date.now() + 5400 * 1000).toUTCString();
  
  const validateEmail = (email)=>{
    return emailRegex.test(email);
  };
  
  const login_api = async(email, password)=>{
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Credenciais incorretas.');
      }
  
      const data = await response.json();
      let token = data.token;
  
      document.cookie = `accessToken=${token}; expires=${expirationDate}; path=/; secure; samesite=strict;`;
      return true;
    } catch (error) {
      document.getElementById("btnLogin").disabled = false;
      setLogingIn(false);
      setErrorMessage(error.message);
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("btnLogin").disabled = true;
    setLogingIn(true);
    
    if (!email || !password) {
      setLogingIn(false);
      setErrorMessage('Por favor, preencha todos os campos.');
      document.getElementById("btnLogin").disabled = false;
      return;
    }

    if (!validateEmail(email)) {
      setLogingIn(false);
      setErrorMessage('Por favor, insira um e-mail válido.');
      document.getElementById("btnLogin").disabled = false;
      return;
    }

    let isLoggedIn = await login_api(email, password);
    
    if(isLoggedIn){
      window.location.href = "/";
    } else {
      setLogingIn(false);
      document.getElementById("btnLogin").disabled = false;
    }
      
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-200">
        <span className="text-center text-gray-500">
          <img src={logo} alt="Leveling" className='w-96'/>
        </span>
      </div>

      <div className="flex flex-col w-full md:w-1/2 justify-center items-center px-8 py-12 bg-white shadow-md">
        <div className="w-full max-w-md space-y-6">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>

          <form className="space-y-4">
            <EmailInput email={email} setEmail={setEmail} errorMessage={errorMessage}/>
            <PasswordInput password={password} setPassword={setPassword}/>
            <div>
              <button
                id='btnLogin'
                type="submit"
                className="flex justify-center w-full py-2 px-4 bg-black text-white text-center rounded-md focus:outline-none hover:bg-gray-800"
                onClick={handleSubmit}
              >
                {loggingIn ? <FiLoader className='text-xl' /> : "Entrar"}
              </button>
            </div>
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
          </form>

          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-gray-500">ou</span>
          </div>
          <div>
            <button
              type="button"
              className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center space-x-2 focus:outline-none hover:bg-gray-100"
            >
              <span className="text-sm text-gray-700">Entrar com Google</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            Não tem uma conta? <a href="/register">Criar conta</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
