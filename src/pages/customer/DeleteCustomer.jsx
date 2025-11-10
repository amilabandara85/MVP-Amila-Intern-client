import React, {useState} from "react";
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';

//export function DeleteCustomer({ show, onClose, onConfirm}) {
function DeleteCustomer({ show, onClose, onConfirm }) {

    if (!show) {
        return null;
    }

    return(
        <div className="modal-backup">
            <div className="modal-content">
                <h2>Delete Customer</h2>
                <p>Are You sure?</p>
                <div className="modal-actions">
                    <button type="button" className="btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="delete-btn" onClick={onConfirm}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteCustomer;

