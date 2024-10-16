import React, { useState } from 'react';
import { FiLoader } from "react-icons/fi";
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import ConfirmPasswordInput from '../components/ConfirmPasswordInput';
import logo from '../assets/logo_leveling.webp';
import '../css/Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [registered, setRegistered] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  const validateEmail = (email) => {
    return emailRegex.test(email);
  };
  
  const register_api = async (email, password) => {
    try {
      const response = await fetch('http://localhost:4000/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
    
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      setRegistered(false);
      setErrorMessage(error.message);
    }
  }

  const clearInpust = ()=>{
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistered(true);
    document.getElementById("btnRegister").disabled = true;
  
    if (!email || !password || !passwordConfirm) {
      setRegistered(false);
      setErrorMessage('Por favor, preencha todos os campos.');
      document.getElementById("btnRegister").disabled = false;
      return;
    }
  
    if (!validateEmail(email)) {
      setRegistered(false);
      setErrorMessage('Por favor, insira um e-mail válido.');
      document.getElementById("btnRegister").disabled = false;
      return;
    }
  
    if (password !== passwordConfirm) {
      setRegistered(false);
      setErrorMessage('As senhas não coincidem.');
      document.getElementById("btnRegister").disabled = false;
      return;
    }
  
    const response = await register_api(email, password);
    
    if (response && response.success) {
      clearInpust();
      setRegistered(false);
      document.getElementById("btnRegister").disabled = false;
      setSuccessMessage(response.success);
      setShowSuccess(true);
      setTimeout(() => {

        window.location.href = "/login";
      }, 3000);
    } else {
      setRegistered(false);
      document.getElementById("btnRegister").disabled = false;
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Cadastro</h2>

          {successMessage && (
            <div className={`success-card ${showSuccess ? 'fade-in' : ''}`}>
              {successMessage}. <a href="/Login" className="text-black hover:underline">Entrar</a>
            </div>
          )}

          <form className="space-y-4">
            <EmailInput 
              email={email} 
              setEmail={setEmail} 
              errorMessage={errorMessage}/>
            <PasswordInput 
              password={password} 
              setPassword={setPassword}/>
            <ConfirmPasswordInput 
              password={password} 
              passwordConfirm={passwordConfirm} 
              setPasswordConfirm={setPasswordConfirm} 
              setErrorMessage={setErrorMessage}
            />
            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
            <div>
              <button
                id='btnRegister'
                type="submit"
                className="flex justify-center w-full py-2 px-4 bg-black text-white text-center rounded-md focus:outline-none hover:bg-gray-800"
                onClick={handleSubmit}
              >
                {registered ? <FiLoader className='text-xl' /> : "Criar conta"}
              </button>
            </div>
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
            Já tem uma conta? <a href="/Login" className="text-black hover:underline">Entrar</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
