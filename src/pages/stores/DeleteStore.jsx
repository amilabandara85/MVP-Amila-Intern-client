import React, {useState} from "react";
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';

export function DeleteStore({ show, onClose, onConfirm }) {

    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Delete Store</h2>
                <p>Are you sure?</p>
                <div className="modal-actions">
                    <button type="button" className="btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="delete-btn " onClick={onConfirm}>
                            Submit
                        </button>
                    </div>
            </div>
        </div>
    );
}


export default DeleteStore;