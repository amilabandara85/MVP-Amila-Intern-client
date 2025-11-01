import React, {useState} from 'react';
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';

export function AddCustomer({show, onClose, onAdd}) {
    const [name, setName] = useState('');
    const [address,setAddress] = useState('');

    if (!show) {
        return null;
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        if(!name || !address) {
            alert('please fill out both Name and Address');
            return;
        }

        onAdd({name, address});

        setName('')
        setAddress('');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Create Customer</h3>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">NAME</label>
                        <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Customer Name"
                        />
                </div>
                <div className="form-group">
                    <lable htmlFor="address">ADDRESS</lable>
                    <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Customer Address"
                    />
                </div>
                <div className="modal-actions">
                    <button type="button" className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="create-btn">
                        Submit
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
    
    }

    export default AddCustomer;