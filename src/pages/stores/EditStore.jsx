import React, { Component, useEffect, useState } from 'react';
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';

export function EditStore ({show, onClose, onUpdate, storeToEdit}) {
  
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (storeToEdit) {
            setName(storeToEdit.name);
            setAddress(storeToEdit.address);
        }

    }, [storeToEdit]);

    if (!show) {
        return null;
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        if (!name || !address) {
            alert('Please fill out name, and address.');
            return;
        }

        onUpdate(storeToEdit.id, {name, address});
    };

    return(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit store</h2>
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
            <label htmlFor="address">ADDRESS</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              
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


export default EditStore;