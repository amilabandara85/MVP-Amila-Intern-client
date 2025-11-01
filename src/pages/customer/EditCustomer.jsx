import React, {Component, useEffect, useState} from "react";
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';

export function EditCustomer ({show, onClose, onUpdate, customerToEdit}) {
    
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (customerToEdit) {
            setName(customerToEdit.name);
            setAddress(customerToEdit.address);
        }

    }, [customerToEdit]);

    if (!show) {
        return null;    
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdate(customerToEdit.id, {name, address});
    };

    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Customer</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">NAME</label>
                        <input
                        text="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                     <div className="form-group">
                        <label htmlFor="address">ADDRESS</label>
                        <input
                        text="text"
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

export default EditCustomer