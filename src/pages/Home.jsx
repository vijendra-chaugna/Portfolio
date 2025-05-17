import React from 'react'
import { useState } from 'react';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
  if (!formData.name || !formData.email || !formData.contactNo) {
    alert('Please fill in all fields.');
    return;
  }

  console.log('Form submitted:', formData);
  alert('Form submitted successfully!');
};

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      contactNo: ''
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50">
      <div className="w-full max-w-md p-4">
        <div className="space-y-4">
          <div className="bg-white p-6 rounded shadow">
            <label className="block text-gray-700 text-lg font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border-b border-gray-300 outline-none"
              placeholder="Your answer"
            />
          </div>

          <div className="bg-white p-6 rounded shadow">
            <label className="block text-gray-700 text-lg font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border-b border-gray-300 outline-none"
              placeholder="Your answer"
            />
          </div>

          <div className="bg-white p-6 rounded shadow">
            <label className="block text-gray-700 text-lg font-medium mb-2">
              Contact no.
            </label>
            <input
              type="tel"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              className="w-full p-2 border-b border-gray-300 outline-none"
              placeholder="Your answer"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handleSubmit}
               className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-6 rounded focus:outline-none"
            >
              Pay Now
            </button>
            <button
              onClick={handleClear}
              className="text-black-600 hover:text-black-800 font-medium"
            >
              Clear form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;