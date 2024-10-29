// src/components/PDF/GeneratePDF.jsx
import React from 'react';
import jsPDF from 'jspdf';

const GeneratePDF = ({ invoice }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Invoice', 10, 10);
    // Add invoice details
    doc.save('invoice.pdf');
  };

  return <button onClick={generatePDF}>Generate PDF</button>;
};

export default GeneratePDF;