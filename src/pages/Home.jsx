import React from 'react'
import { useState, useEffect } from 'react';

const DynamicForm = () => {
  // Form data state to store all field values
  const [formData, setFormData] = useState({});
  
  // This would typically come from an API call
  const [formFields, setFormFields] = useState([
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      options: []
    },
    {
      id: 'gender',
      label: 'Gender',
      type: 'radio',
      options: ['Male', 'Female','Other']
    },
    // We'll keep the original fields for backward compatibility
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      options: []
    },
    {
      id: 'contactNo',
      label: 'Contact no.',
      type: 'tel',
      options: []
    },
    {
      id: 'Age',
      label: 'Age',
      type: 'number',
      options: []
    },
    {
      id: 'Address',
      label: 'Address',
      type: 'text',
      options: []
    }
  ]);

// // Replace this with your API call
// useEffect(() => {
//   // Example API call
//   fetch('/api/form-fields')
//     .then(response => response.json())
//     .then(data => setFormFields(data));
// }, []);

  
  const title = "Payment Information";
  const description = "Please provide your contact details to complete the payment process.";
  
  // Initialize form data with empty values
  useEffect(() => {
    const initialData = {};
    formFields.forEach(field => {
      if (field.type === 'radio' && field.options.length > 0) {
        initialData[field.id] = ''; // Empty string for radio buttons initially
      } else {
        initialData[field.id] = '';
      }
    });
    setFormData(initialData);
  }, [formFields]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = () => {
    // Check if all fields are filled
    const isFormValid = formFields.every(field => formData[field.id]);
    
    if (!isFormValid) {
      alert('Please fill in all fields.');
      return;
    }
    
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };
  
  const handleClear = () => {
    const clearedData = {};
    formFields.forEach(field => {
      clearedData[field.id] = '';
    });
    setFormData(clearedData);
  };
  
  // Render different input types based on field type
  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'tel':  
        return (
          <input
            type={field.type}
            name={field.id}
            value={formData[field.id] || ''}
            onChange={handleChange}
            className="w-full p-2 border-b border-gray-300 outline-none"
            placeholder="Your answer"
          />
        );
      case 'radio':
        return (
          <div className="flex flex-col space-y-2 mt-2">
            {field.options.map(option => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={formData[field.id] === option}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50">
      <div className="w-full max-w-md p-4">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
        <div className="space-y-4">
          {formFields.map(field => (
            <div key={field.id} className="bg-white p-6 rounded shadow">
              <label className="block text-gray-700 text-lg font-medium mb-2">
                {field.label}
              </label>
              {renderField(field)}
            </div>
          ))}
          <div className="flex justify-between items-center">
            <button
              onClick={handleSubmit}
              className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-6 rounded focus:outline-none"
            >
              Pay Now
            </button>
            <button
              onClick={handleClear}
              className="text-black hover:text-gray-800 font-medium"
            >
              Clear form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;