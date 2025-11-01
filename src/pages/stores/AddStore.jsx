import React, { useState } from 'react';
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';

export function AddStore({ show, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  
    if (!show) { 
      return null;
    }

    const handleSubmit = (event) =>{
      event.preventDefault();

      if(!name || !address) {
        alert('Please fill out both Name and Address.');
        return;
      }

        onAdd({name, address});

        setName('');
        setAddress('');

    };
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Create store</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">NAME</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Store Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">ADDRESS</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Store Address"
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

export default AddStore;