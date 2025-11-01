import React, { Component, useEffect, useState } from 'react';
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';

export function EditSales({ show, onClose, onUpdate, salesToEdit, customers, products, stores }) {

    
    const getFormattedCurrentDate = () => {
        const now = new Date();
        
        return now.toISOString().split('T')[0];
    };

    const [datesold, setDateSold] = useState(getFormattedCurrentDate());
    const [customerId, setCustomerId] = useState('');
    const [productId, setProductId] = useState('');
    const [storeId, setStoreId] = useState('');

    useEffect(() => {
        if (salesToEdit) {
            const formattedDate = salesToEdit.dateSold ? new Date(salesToEdit.dateSold).toISOString().split('T')[0] : ''

            setDateSold(formattedDate);
            setCustomerId(String(salesToEdit.customerId || ''));
            setProductId(String(salesToEdit.productId || ''));
            setStoreId(String(salesToEdit.storeId || ''));
            
        }

    }, [salesToEdit]);

    if (!show || !salesToEdit) {
        return null;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!datesold || !customerId || !productId || !storeId) {
            alert('Please fill out Date of sold, and select Customer, Product, and Store.');
            return;
        }

        const updatedData = {
            
            DateSold: datesold,
            CustomerId: parseInt(customerId),
            ProductId: parseInt(productId),
            StoreId: parseInt(storeId)
        };

        onUpdate(salesToEdit.id, updatedData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Sales</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="datesold">Date of Sold:</label>
                        <input
                            id="datesold"
                            type="date"
                            value={datesold}
                            onChange={(e) => setDateSold(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="customerId">Customer:</label>
                        <select
                            id="customerId"
                            value={customerId}
                            onChange={(e) => setCustomerId(e.target.value)}
                            className="form-control"
                            required
                        >
                            
                            {customers.map(customer => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="customerId">Product:</label>
                        <select
                            id="productId"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="form-control"
                            required
                        >
                           
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="customerId">Store:</label>
                        <select
                            id="storeId"
                            value={storeId}
                            onChange={(e) => setStoreId(e.target.value)}
                            className="form-control"
                            required
                        >

                            {stores.map(store => (
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
                            Edit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default EditSales;