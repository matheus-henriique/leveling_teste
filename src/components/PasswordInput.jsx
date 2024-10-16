import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function PasswordInput({ password, setPassword }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
      <div className="relative">
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
        />
        <div
          className="absolute top-4 right-0 pr-3 flex items-center cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
        </div>
      </div>
    </div>
  );
}

export default PasswordInput;