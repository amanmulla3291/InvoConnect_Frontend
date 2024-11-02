import React, { useState } from 'react';
import { 
  Button, 
  Modal, 
  FormGroup, 
  InputGroup, 
  Toaster, 
  Position, 
  Callout 
} from '@blueprintjs/core';
import { WhatsAppIcon } from '@blueprintjs/icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ShareToWhatsApp = ({ data, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const toaster = React.createRef();

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneRegex.test(number);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`${type.charAt(0).toUpperCase() + type.slice(1)} Document`, 14, 22);
    
    const tableData = data.map(item => [
      item.itemName,
      item.quantity,
      item.unit,
      `$${item.price}`,
      `$${item.total}`
    ]);

    const total = data.reduce((sum, item) => sum + item.total, 0).toFixed(2);

    doc.autoTable({
      startY: 30,
      head: [['Item Name', 'Quantity', 'Unit', 'Price', 'Total']],
      body: tableData,
      theme: 'striped'
    });

    doc.text(`Total ${type}: $${total}`, 14, doc.autoTable.previous.finalY + 10);

    const filename = `${type}_${Date.now()}.pdf`;
    doc.save(filename);

    return filename;
  };

  const shareOnWhatsApp = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setErrorMessage('Please enter a valid phone number');
      return;
    }
    if (!data || data.length === 0) {
      setErrorMessage('No data available to share');
      return;
    }

    const pdfFilename = generatePDF();
    const message = `Here is the ${type} document for your reference: ${pdfFilename}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
    toaster.current.show({ message: 'Document shared via WhatsApp!', intent: 'success' });
  };

  return (
    <>
      <Button 
        icon={<WhatsAppIcon />} 
        intent="primary" 
        onClick={() => setIsModalOpen(true)}
      >
        Share via WhatsApp
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Share via WhatsApp"
      >
        <div className="bp3-dialog-body">
          <FormGroup 
            label="Client's WhatsApp Number" 
            labelFor="phone-number" 
            required 
            helperText="Enter full international phone number (e.g., +1234567890)"
          >
            <InputGroup
              id="phone-number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setErrorMessage('');
              }}
              placeholder="+1234567890"
              required
            />
          </FormGroup>

          {errorMessage && (
            <Callout intent="danger" title="Error">
              {errorMessage}
            </Callout>
          )}

          {(!data || data.length === 0) && (
            <Callout intent="warning" title="No Data">
              No data available to generate the document.
            </Callout>
          )}
        </div>

        <div className="bp3-dialog-footer">
          <Button 
            intent="primary" 
            onClick={shareOnWhatsApp}
          >
            Send
          </Button>
          <Button 
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </Modal>

      <Toaster ref={toaster} position={Position.TOP} />
    </>
  );
};

export default ShareToWhatsApp;