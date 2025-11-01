import React, { Component, useEffect, useState } from 'react';
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';

export function EditProduct ({show, onClose, onUpdate, productToEdit}) {
  
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            setPrice(productToEdit.price);
        }

    }, [productToEdit]);

    if (!show) {
        return null;
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        onUpdate(productToEdit.id, {name, price});
    };

    return(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">NAME</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">PRICE</label>
            <input
              type="number"
              id="price"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
             
              
            />
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


export default EditProduct;