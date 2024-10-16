import React from 'react';

function EmailInput({ email, setEmail }) {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
      />
    </div>
  );
}

export default EmailInput;