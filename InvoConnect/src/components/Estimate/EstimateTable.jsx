import React, { useState } from 'react';
import { 
  Button, 
  Modal, 
  Classes, 
  Table, 
  Column, 
  Cell,
  Intent,
  NonIdealState 
} from '@blueprintjs/core';
import GeneratePDF from './GeneratePDF';
import ShareToWhatsApp from './ShareToWhatsApp';

const EstimateTable = () => {
  const [estimates, setEstimates] = useState([
    { id: 1, itemName: 'Sample Item 1', quantity: 10, unit: 'Piece', price: 50, total: 500 },
    { id: 2, itemName: 'Sample Item 2', quantity: 5, unit: 'Kg', price: 75, total: 375 },
  ]);

  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id) => {
    setEstimates(estimates.filter(estimate => estimate.id !== id));
  };

  const handleView = (estimate) => {
    setSelectedEstimate(estimate);
    setIsModalOpen(true);
  };

  const calculateTotalEstimate = () => {
    return estimates.reduce((total, est) => total + est.total, 0).toFixed(2);
  };

  return (
    <div className="estimate-table-container">
      <Table striped>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Price per Unit</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {estimates.length ? estimates.map((estimate) => (
            <tr key={estimate.id}>
              <td>{estimate.itemName}</td>
              <td>{estimate.quantity}</td>
              <td>{estimate.unit}</td>
              <td>${estimate.price}</td>
              <td>${estimate.total}</td>
              <td>
                <div className="action-buttons">
                  <Button 
                    intent={Intent.PRIMARY} 
                    onClick={() => handleView(estimate)}
                  >
                    View
                  </Button>
                  <Button 
                    intent={Intent.DANGER} 
                    onClick={() => handleDelete(estimate.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={6}>
                <NonIdealState 
                  icon="inbox" 
                  title="No Estimates" 
                  description="No estimates available."
                />
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Total Estimate Summary */}
      <div className="estimate-total mt-4">
        <h3>Total Estimate: ${calculateTotalEstimate()}</h3>
        <div className="action-buttons mt-3">
          <GeneratePDF data={estimates} type="estimate" />
          <ShareToWhatsApp 
            data={estimates} 
            type="estimate"
          />
        </div>
      </div>

      {/* View Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Estimate Details"
      >
        <div className={Classes.DIALOG_BODY}>
          {selectedEstimate && (
            <>
              <p><strong>Item Name:</strong> {selectedEstimate.itemName}</p>
              <p><strong>Quantity:</strong> {selectedEstimate.quantity} {selectedEstimate.unit}</p>
              <p><strong>Price per Unit:</strong> ${selectedEstimate.price}</p>
              <p><strong>Total:</strong> ${selectedEstimate.total}</p>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default EstimateTable;
