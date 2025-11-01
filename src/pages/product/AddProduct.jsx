import React, { useState } from 'react';
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';

export function AddProduct({ show, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  
    if (!show) { 
      return null;
    }

    const handleSubmit = (event) =>{
      event.preventDefault();

      if(!name || !price) {
        alert('Please fill out both Name and Price.');
        return;
      }

        onAdd({name, price});

        setName('');
        setPrice('');

    };
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">NAME</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Product Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">PRICE</label>
            <input
              type="number"
              id="price"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Price"
            />
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

export default AddProduct;