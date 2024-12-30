// components/DeleteTests.js

import React from 'react';
import axios from 'axios';

const DeleteTests = () => {
  const deleteAllData = async () => {
    try {
      const response = await axios.delete('http://localhost:5001/api/test');
      alert(response.data.message);  // Show success message
    } catch (error) {
      console.error('Error deleting tests:', error);
      alert('Failed to delete tests');
    }
  };

  return (
    <div className='h-screen flex items-center justify-center'>
      <button onClick={deleteAllData} className="bg-blue-600 px-4 py-2 rounded text-white">
        Delete All Tests
      </button>
    </div>
  );
};

export default DeleteTests;
