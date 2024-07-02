import React from 'react';

const brainstormy = () => {
  const handleChatOptionClick = async (option) => {
    const redirectURL = 'http://localhost:3002/';
    window.location.href = redirectURL;
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-orange-100 shadow-md rounded-lg p-4 mb-2">
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Ensures the card is centered vertically
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '40px', // Increased padding for the card
          width: '80%',
          maxWidth: '600px', // Increased max width for the card
          backgroundColor: '#f5f5f5', // Added background color for better visibility
          borderRadius: '15px', // Increased border radius for rounded corners
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Added box shadow for depth
        }}
      >
        <div
          onClick={() => handleChatOptionClick('Community Chat')}
          style={{
            cursor: 'pointer',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '15px',
            transition: 'transform 0.2s ease-in-out',
            position: 'relative',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
            }}
          >
            <h2 style={{ margin: '0', fontWeight: 'bold', fontSize: '24px' }}>Chat App</h2>
            <p style={{ margin: '10px 0', fontSize: '18px' }}>Welcome to Chat App</p>
            <button
              style={{
                padding: '12px 24px',
                backgroundColor: '#2a61cc',
                color: '#fff',
                borderRadius: '5px',
                border: 'none',
                fontSize: '16px',
              }}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default brainstormy;