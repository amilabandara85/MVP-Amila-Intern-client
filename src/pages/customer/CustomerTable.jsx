import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';
import { NavMenu } from "../../components/navmenu/NavMenu";


import {
    fetchCustomersAsync,
    addCustomerAsync,
    updateCustomerAsync,
    deleteCustomerAsync,
} from '../../redux_slice/customerslice'; 

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';


export function CustomerTable() {


    // Redux Hooks
    const dispatch = useDispatch();
    const { customers, loading, error } = useSelector((state) => state.customerDetails);

    // Local UI State (still managed via useState)
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [customerToEdit, setCustomerToEdit] = React.useState(null);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [customerToDeleteId, setCustomerToDeleteId] = React.useState(null);


    // Fetch data on component mount (equivalent to componentDidMount)
    useEffect(() => {
        dispatch(fetchCustomersAsync());
    }, [dispatch]);


    // --- MODAL HANDLERS ---
    const openAddModal = () => setShowAddModal(true);
    const closeAddModal = () => setShowAddModal(false);

    const openEditModal = (customer) => {
        setShowEditModal(true);
        setCustomerToEdit(customer);
    };
    const closeEditModal = () => {
        setShowEditModal(false);
        setCustomerToEdit(null);
    };

    const openDeleteModal = (id) => {
        setShowDeleteModal(true);
        setCustomerToDeleteId(id);
    };
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setCustomerToDeleteId(null);
    };


    // --- CRUD HANDLERS (Dispatching Redux Thunks) ---

    // Add
    const handleAddCustomer = async (newCustomerData) => {
        await dispatch(addCustomerAsync(newCustomerData));
        alert('New Customer added'); // Use Redux success/error handling for better UX
        closeAddModal();
        // Redux slice handles state update, no need to manually call fetch
    };

    // Edit
    const handleUpdateCustomer = async (id, updatedCustomerData) => {
        const customerToUpdate = {
            id: id,
            name: updatedCustomerData.name,
            address: updatedCustomerData.address 
        };
        // Dispatch the thunk with the ID and the new data
        const resultAction = await dispatch(updateCustomerAsync({
            id: id,
            updatedCustomerData: customerToUpdate
        }));

        if (updateCustomerAsync.fulfilled.match(resultAction)) {
            alert('Customer Updated Successfully!');
        } else {
            console.error("Failed to Update:", resultAction.payload);
            alert('Error: Could not update the Customer');
        }
        closeEditModal();
        // Redux slice handles state update
    };

    // Delete
    const handleConfirmDelete = async () => {
        await dispatch(deleteCustomerAsync(customerToDeleteId));
        alert('Customer Deleted!'); 
        closeDeleteModal();
        
    };

    // --- RENDER FUNCTIONS ---
    const renderCustomersTable = (customers) => {
        return (
            <div className="global-container">
                <table className="global-table table table-striped" aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer =>
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.address}</td>
                                <td><button className="edit-btn" onClick={() => openEditModal(customer)}>Edit</button></td>
                                <td><button className="delete-btn" onClick={() => openDeleteModal(customer.id)}>Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    // --- MAIN RENDER ---
    let contents;

    if (loading) {
        contents = <p><em>Loading.....</em></p>;
    } else if (error) {
        contents = <p className="text-red-600"><em>Error: {error}</em></p>;
    }
    else {
        contents = renderCustomersTable(customers);
    }


    return (
        <div>
            <br></br>
            <br></br>
            <h2 id="tableLabel" className="text=lg sm:text-xl lg:text-2xl font-bold text-wite-600">Customer</h2>
            <br></br>
            <button onClick={openAddModal} className="new-global-btn">New Customer</button>
            <br></br>
            {contents}
            <br></br>
            <br></br>

            <AddCustomer
                show={showAddModal}
                onClose={closeAddModal}
                onAdd={handleAddCustomer}
            />

            <EditCustomer
                show={showEditModal}
                onClose={closeEditModal}
                onUpdate={handleUpdateCustomer}
                customerToEdit={customerToEdit}
            />

            <DeleteCustomer
                show={showDeleteModal}
                onClose={closeDeleteModal}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}
export default CustomerTable;