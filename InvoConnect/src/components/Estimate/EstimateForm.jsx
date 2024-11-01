import React, { useState } from 'react'; 
import { Button, FormGroup, InputGroup, HTMLSelect, H3 } from '@blueprintjs/core';
import './EstimateForm.css'; // Optional for any custom styling

const EstimateForm = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [estimates, setEstimates] = useState([]);

  const unitOptions = [
    'Piece', 'Kg', 'Liter', 'Meter', 'Hour', 'Day', 'Square Meter'
  ];

  const handleAddEstimate = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (itemName && quantity && unit && price) {
      const newEstimate = {
        id: Date.now(),
        itemName,
        quantity,
        unit,
        price: parseFloat(price).toFixed(2),
        total: (parseFloat(quantity) * parseFloat(price)).toFixed(2),
      };
      setEstimates([...estimates, newEstimate]);
      
      // Reset form
      setItemName('');
      setQuantity('');
      setUnit('');
      setPrice('');
    }
  };

  return (
    <div className="estimate-form-container">
      <form onSubmit={handleAddEstimate}>
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
            required
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
          text="Add to Estimate" 
          intent="primary" 
          type="submit" 
          style={{ marginTop: '10px' }}
        />
      </form>

      {estimates.length > 0 && (
        <div className="estimate-list" style={{ marginTop: '20px' }}>
          <H3>Estimate Summary</H3>
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
              {estimates.map((est) => (
                <tr key={est.id}>
                  <td>{est.itemName}</td>
                  <td>{est.quantity}</td>
                  <td>{est.unit}</td>
                  <td>${est.price}</td>
                  <td>${est.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EstimateForm;
