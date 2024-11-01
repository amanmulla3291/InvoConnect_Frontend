import React, { useState } from 'react'; 
import { 
  Button, 
  FormGroup, 
  InputGroup, 
  HTMLSelect, 
  H3 
} from '@blueprintjs/core';
import './InvoiceForm.css'; // Optional for any custom styling

const InvoiceForm = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [invoices, setInvoices] = useState([]);

  const unitOptions = [
    'Piece', 'Kg', 'Liter', 'Meter', 'Hour', 'Day', 'Square Meter'
  ];

  const handleAddInvoice = () => {
    if (itemName && quantity && unit && price) {
      const newInvoice = {
        id: Date.now(),
        itemName,
        quantity,
        unit,
        price: parseFloat(price).toFixed(2),
        total: (parseFloat(quantity) * parseFloat(price)).toFixed(2)
      };
      setInvoices([...invoices, newInvoice]);
      
      // Reset form
      setItemName('');
      setQuantity('');
      setUnit('');
      setPrice('');
    }
  };

  return (
    <div className="invoice-form-container">
      <form>
        <FormGroup label="Item Name" labelFor="item-name" labelInfo="(required)">
          <InputGroup
            id="item-name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name"
            required
          />
        </FormGroup>
        
        <FormGroup label="Quantity" labelFor="quantity" labelInfo="(required)">
          <InputGroup
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            required
          />
        </FormGroup>
        
        <FormGroup label="Unit" labelFor="unit" labelInfo="(required)">
          <HTMLSelect 
            id="unit"
            options={unitOptions}
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </FormGroup>
        
        <FormGroup label="Price per Unit" labelFor="price" labelInfo="(required)">
          <InputGroup
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </FormGroup>
        
        <Button 
          text="Add to Invoice" 
          intent="primary" 
          onClick={handleAddInvoice} 
        />
      </form>

      {invoices.length > 0 && (
        <div className="invoice-list mt-4">
          <H3>Invoice Summary</H3>
          <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td>{inv.itemName}</td>
                  <td>{inv.quantity}</td>
                  <td>{inv.unit}</td>
                  <td>${inv.price}</td>
                  <td>${inv.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InvoiceForm;
