import React, { useState } from "react";
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';

export function DeleteSales({ show, onClose, onDelete, sale }) {

    if (!show || !sale) {
        return null;
    }

    const handleDelete = () => {
        
        onDelete(sale.id);
    };

    const formattedDate = sale.dateSold ? new Date(sale.dateSold).toLocaleDateString() : 'N/A';


    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Delete Sales</h2>
                <p>Are you sure you want to delete the following Sale record?</p>

                <div className="delete-details">
                    <p><strong>ID:</strong> {sale.id}</p>
                    <p><strong>Date Sold:</strong> {formattedDate}</p>
                    <p><strong>Customer:</strong> {sale.customer?.name || 'N/A'}</p>
                    <p><strong>Product:</strong> {sale.product?.name || 'N/A'}</p>
                    <p><strong>Store:</strong> {sale.store?.name || 'N/A'}</p>
                </div>

                <div className="modal-actions">
                    <button type="button" className="btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="delete-btn " onClick={handleDelete}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}


export default DeleteSales;