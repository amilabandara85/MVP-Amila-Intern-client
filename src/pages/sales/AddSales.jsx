import React, { useState } from 'react';
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';

export function AddSales({ show, onClose, onAdd, customers, products, stores }) {

    // Helper to get today's date in YYYY-MM-DD format for the input default value
    const getFormattedCurrentDate = () => {
        const now = new Date();
        // Using toISOString and splitting is a reliable way to get YYYY-MM-DD
        return now.toISOString().split('T')[0];
    };

    const [datesold, setDateSold] = useState(getFormattedCurrentDate());
    const [customerId, setCustomerId] = useState('');
    const [productId, setProductId] = useState('');
    const [storeId, setStoreId] = useState('');

    if (!show) {
        return null;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!customerId || !productId || !storeId) {
            alert('Please fill out Date of sold, and select Customer, Product and, Store.');
            return;
        }

        // Call the onAdd prop function passed from SalesTable.jsx
        onAdd({
            datesold,
            // Convert dropdown values to integers for the API 
            customerId: parseInt(customerId),
            productId: parseInt(productId),
            storeId: parseInt(storeId)
        });

        // Reset form
        setDateSold(getFormattedCurrentDate());
        setCustomerId('');
        setProductId('');
        setStoreId('');
        onClose();
    };


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Create Sales</h3>
                <form onSubmit={handleSubmit}>

                    {/* 1. Date Input (Unchanged) */}
                    <div className="form-group">
                        <label htmlFor="datesold">Date of Sold:</label>
                        <input
                            type="date"
                            id="datesold"
                            value={datesold}
                            onChange={(e) => setDateSold(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>

                    {/* 2. Customer Dropdown - FIX APPLIED HERE */}
                    <div className="form-group">
                        <label htmlFor="customerId">Customer:</label>
                        <select
                            id="customerId"
                            value={customerId}
                            onChange={(e) => setCustomerId(e.target.value)}
                            className="form-control"
                            required
                        >
                            <option value="">-- Select Customer --</option>
                            {Array.isArray(customers) && customers.map(customer => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 3. Product Dropdown - FIX APPLIED HERE for robustness */}
                    <div className="form-group">
                        <label htmlFor="productId">Product:</label>
                        <select
                            id="productId"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="form-control"
                            required
                        >
                            <option value="">-- Select Product --</option>
                            {Array.isArray(products) && products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 4. Store Dropdown - FIX APPLIED HERE for robustness */}
                    <div className="form-group">
                        <label htmlFor="storeId">Store:</label>
                        <select
                            id="storeId"
                            value={storeId}
                            onChange={(e) => setStoreId(e.target.value)}
                            className="form-control"
                            required
                        >
                            <option value="">-- Select Store --</option>
                            {Array.isArray(stores) && stores.map(store => (
                                <option key={store.id} value={store.id}>
                                    {store.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            cancel
                        </button>
                        <button type="submit" className="create-btn" >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default AddSales;