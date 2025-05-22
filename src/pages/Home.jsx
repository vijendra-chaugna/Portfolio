import React from 'react'
import { useState, useEffect } from 'react';

const Home = () => {
  // Form data state to store all field values
  const [formData, setFormData] = useState({});
  
  // State for UI elements that will be fetched from backend
  const [formConfig, setFormConfig] = useState({
    title: "Payment Information",
    description: "Please provide your contact details to complete the payment process.",
    backgroundColor: "bg-purple-50"
  });
  
  // Form fields state
  const [formFields, setFormFields] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Fetch form configuration from backend
  useEffect(() => {
    const fetchFormConfig = async () => {
      try {
        setLoading(true);
        // Updated to use your actual API endpoint
        const response = await fetch('http://localhost:5000/api/form');
        const data = await response.json();
        
        // Update state with the fetched data
        setFormConfig({
          title: data.title || "Payment Details",
          description: data.description || "Please fill in your information to proceed with payment.",
          backgroundColor: data.backgroundColor || "bg-blue-50"
        });
        
        setFormFields(data.fields || []);
      } catch (error) {
        console.error("Failed to fetch form configuration:", error);
        // Fallback to default fields if API fails
        setFormFields([
          {
            id: 'name',
            label: 'Name',
            type: 'text',
            options: []
          },
          {
            id: 'email',
            label: 'Email',
            type: 'email',
            options: []
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFormConfig();
  }, []);

  // Initialize form data with empty values
  useEffect(() => {
    const initialData = {};
    formFields.forEach(field => {
      initialData[field.id] = '';
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
  
  const handleSubmit = async () => {
    // Check if all fields are filled
    const isFormValid = formFields.every(field => formData[field.id]);
    
    if (!isFormValid) {
      alert('Please fill in all fields.');
      return;
    }
    
    try {
      setLoading(true);
      // Send form data to backend for payment processing
      const response = await fetch('http://localhost:5000/api/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });
      
      const paymentData = await response.json();
      
      if (response.ok) {
        // Initialize Razorpay
        const options = {
          key: paymentData.key_id,
          amount: paymentData.order.amount,
          currency: paymentData.order.currency,
          name: "Your Company Name",
          description: "Payment for services",
          order_id: paymentData.order.id,
          handler: function (response) {
            alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
            console.log('Payment successful:', response);
            // You can redirect or update UI here
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.contactNo
          },
          theme: {
            color: "#000000"
          }
        };
        
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert('Payment initialization failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
  
  // Show loading state
  if (loading || formFields.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg">Loading form...</p>
      </div>
    );
  }
  
  return (
    <div className={`flex justify-center items-center min-h-screen ${formConfig.backgroundColor}`}>
      <div className="w-full max-w-md p-4">
        <div className="space-y-4">
          {/* Title and Description in a white card */}
          <div className="bg-white p-6 rounded shadow text-center">
            <h1 className="text-2xl font-bold text-gray-800">{formConfig.title}</h1>
            <p className="text-gray-600 mt-2">{formConfig.description}</p>
          </div>
          
          {/* Form Fields */}
          {formFields.map(field => (
            <div key={field.id} className="bg-white p-6 rounded shadow">
              <label className="block text-gray-700 text-lg font-medium mb-2">
                {field.label}
              </label>
              {renderField(field)}
            </div>
          ))}
          
          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-6 rounded focus:outline-none disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
            <button
              onClick={handleClear}
              disabled={loading}
              className="text-black hover:text-gray-800 font-medium disabled:opacity-50"
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