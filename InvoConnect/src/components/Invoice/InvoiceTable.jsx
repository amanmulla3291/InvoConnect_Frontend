import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableCell, 
  Button, 
  Modal, 
  H3 
} from '@blueprintjs/core';
import GeneratePDF from './GeneratePDF';
import ShareToWhatsApp from './ShareToWhatsApp';

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      itemName: 'Sample Invoice Item 1',
      quantity: 10,
      unit: 'Piece',
      price: 50,
      total: 500
    },
    {
      id: 2,
      itemName: 'Sample Invoice Item 2',
      quantity: 5,
      unit: 'Kg',
      price: 75,
      total: 375
    }
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
  };

  const handleView = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const calculateTotalInvoice = () => {
    return invoices.reduce((total, inv) => total + inv.total, 0).toFixed(2);
  };

  return (
    <div className="invoice-table-container">
      <Table>
        <TableHeader>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Price per Unit</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.itemName}</TableCell>
              <TableCell>{invoice.quantity}</TableCell>
              <TableCell>{invoice.unit}</TableCell>
              <TableCell>${invoice.price}</TableCell>
              <TableCell>${invoice.total}</TableCell>
              <TableCell>
                <div className="action-buttons">
                  <Button 
                    intent="primary" 
                    onClick={() => handleView(invoice)}
                  >
                    View
                  </Button>
                  <Button 
                    intent="danger" 
                    onClick={() => handleDelete(invoice.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Total Invoice Summary */}
      <div className="invoice-total mt-4">
        <H3>Total Invoice: ${calculateTotalInvoice()}</H3>
        <div className="action-buttons mt-3">
          <GeneratePDF data={invoices} type="invoice" />
          <ShareToWhatsApp 
            data={invoices} 
            type="invoice"
          />
        </div>
      </div>

      {/* View Details Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Invoice Details"
        >
          <div className="invoice-details">
            <p><strong>Item Name:</strong> {selectedInvoice.itemName}</p>
            <p><strong>Quantity:</strong> {selectedInvoice.quantity} {selectedInvoice.unit}</p>
            <p><strong>Price per Unit:</strong> ${selectedInvoice.price}</p>
            <p><strong>Total:</strong> ${selectedInvoice.total}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default InvoiceTable;
