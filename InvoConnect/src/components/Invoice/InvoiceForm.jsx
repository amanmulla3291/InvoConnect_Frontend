// src/components/Invoice/InvoiceForm.jsx
import React, { useState } from 'react';

const InvoiceForm = () => {
  const [items, setItems] = useState([{ description: '', quantity: 1, rate: 0 }]);

  const handleChange = (index, e) => {
    const newItems = [...items];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, rate: 0 }]);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.rate, 0);
  };

  return (
    <form>
      {items.map((item, index) => (
        <div key={index}>
          <input type="text" name="description" value={item.description} onChange={(e) => handleChange(index, e)} placeholder="Description" required />
          <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleChange(index, e)} placeholder="Quantity" required />
          <input type="number" name="rate" value={item.rate} onChange={(e) => handleChange(index, e)} placeholder="Rate" required />
        </div>
      ))}
      <button type="button" onClick={addItem}>Add Item</button>
      <p>Total: {calculateTotal()}</p>
    </form>
  );
};

export default InvoiceForm;