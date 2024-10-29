// src/components/WhatsApp/ShareToWhatsApp.jsx
import React from 'react';

const ShareToWhatsApp = ({ invoice }) => {
  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(JSON.stringify(invoice))}`;
    window.open(url, '_blank');
  };

  return <button onClick={shareToWhatsApp}>Share to WhatsApp</button>;
};

export default ShareToWhatsApp;