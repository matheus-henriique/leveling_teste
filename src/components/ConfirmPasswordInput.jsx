import React, { useState } from 'react';

const ConfirmPasswordInput = ({ password, passwordConfirm, setPasswordConfirm, setErrorMessage }) => {
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const handlePasswordConfirmChange = (e) => {
    const confirmPassword = e.target.value;
    setPasswordConfirm(confirmPassword);

    if (password !== confirmPassword) {
      setIsPasswordMatch(false);
      setErrorMessage('As senhas não coincidem.');
    } else {
      setIsPasswordMatch(true);
      setErrorMessage('');
    }
  };

  return (
    <div>
      <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
      <div className="relative">
        <input
          id="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          required
          className={`mt-1 w-full px-3 py-2 border ${isPasswordMatch ? 'border-gray-300' : 'border-red-500'} rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
        />
      </div>
    </div>
  );
};

export default ConfirmPasswordInput;
