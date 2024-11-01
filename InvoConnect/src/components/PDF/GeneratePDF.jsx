import React from 'react';
import { Button, EmptyState, EmptyStateIcon, EmptyStateBody } from '@blueprintjs/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GeneratePDF = ({ data, type }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text(`${type.charAt(0).toUpperCase() + type.slice(1)} Document`, 14, 22);
    
    // Prepare table data
    const tableData = data.map(item => [
      item.itemName,
      item.quantity,
      item.unit,
      `$${item.price}`,
      `$${item.total}`
    ]);

    // Add table
    doc.autoTable({
      startY: 30,
      head: [['Item Name', 'Quantity', 'Unit', 'Price', 'Total']],
      body: tableData,
      theme: 'striped'
    });

    // Save the PDF
    doc.save(`${type}_document.pdf`);
  };

  if (!data || data.length === 0) {
    return (
      <EmptyState>
        <EmptyStateIcon icon="document" />
        <EmptyStateBody>No data available to generate PDF.</EmptyStateBody>
      </EmptyState>
    );
  }

  return (
    <Button intent="primary" onClick={generatePDF}>
      Generate {type.charAt(0).toUpperCase() + type.slice(1)} PDF
    </Button>
  );
};

export default GeneratePDF;
