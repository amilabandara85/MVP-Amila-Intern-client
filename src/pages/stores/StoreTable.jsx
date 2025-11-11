import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';
import { NavMenu } from "../../components/navmenu/NavMenu";

import {
    fetchStoresAsync,
    addStoreAsync,
    updateStoreAsync,
    deleteStoreAsync,
} from '../../redux_slice/storeslice'; 

import DeleteStore from './DeleteStore';
import EditStore from './EditStore';
import AddStore from './AddStore';

export function StoreTable () {
    
    // Redux Hooks
    const dispatch = useDispatch();
    const { stores, loading, error } = useSelector((state) => state.storeDetails);

    // Local UI State (still managed via useState)
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [storeToEdit, setStoreToEdit] = React.useState(null);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [storeToDeleteId, setStoreToDeleteId] = React.useState(null);


    // Fetch data on component mount (equivalent to componentDidMount)
    useEffect(() => {
        dispatch(fetchStoresAsync());
    }, [dispatch]);


    // --- MODAL HANDLERS ---
    const openAddModal = () => setShowAddModal(true);
    const closeAddModal = () => setShowAddModal(false);

    const openEditModal = (store) => {
        setShowEditModal(true);
        setStoreToEdit(store);
    };
    const closeEditModal = () => {
        setShowEditModal(false);
        setStoreToEdit(null);
    };

    const openDeleteModal = (id) => {
        setShowDeleteModal(true);
        setStoreToDeleteId(id);
    };
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setStoreToDeleteId(null);
    };


    // --- CRUD HANDLERS (Dispatching Redux Thunks) ---

    // Add
    const handleAddStore = async (newStoreData) => {
        await dispatch(addStoreAsync(newStoreData));
        alert('New Store added'); // Use Redux success/error handling for better UX
        closeAddModal();
        // Redux slice handles state update, no need to manually call fetch
    };

    // Edit
    const handleUpdateStore = async (id, updatedStoreData) => {
        const storeToUpdate = {
            id: id,
            name: updatedStoreData.name,
            address: updatedStoreData.address
        };
        // Dispatch the thunk with the ID and the new data
        const resultAction = await dispatch(updateStoreAsync({
            id: id,
            updatedStoreData: storeToUpdate
        }));

        if (updateStoreAsync.fulfilled.match(resultAction)) {
            alert('Store Updated Successfully!');
        } else {
            console.error("Failed to Update:", resultAction.payload);
            alert('Error: Could not update the Store');
        }
        closeEditModal();
        // Redux slice handles state update
    };

    // Delete
    const handleConfirmDelete = async () => {
        await dispatch(deleteStoreAsync(storeToDeleteId));
        alert('Store Deleted!');
        closeDeleteModal();

    };
   
    const renderStoresTable = (stores) => {
        return (
            
            <div className="global-container">
            <table className="global-table table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                        <th>Action</th>
                   
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store =>
                        <tr key={store.id}>
                            <td>{store.id}</td>
                            <td>{store.name}</td>
                            <td>{store.address}</td>

                            <td><button className="edit-btn " onClick={() => openEditModal(store)}>Edit</button></td>                                                 
                            <td><button className="delete-btn " onClick={() => openDeleteModal(store.id)}>Delete</button></td>

                                                     
                        </tr>
                    )}
                </tbody>
            </table>

          
         
            </div>
           
        );
    }


        let contents;

        if (loading) {
            contents = <p><em>Loading.....</em></p>;
        } else if (error) {
            contents = <p className="text-red-600"><em>Error: {error}</em></p>;
        } else {
            contents = renderStoresTable(stores);
        }

        return (
            <div>
 
                <br></br>
                 <br></br>

                <h2 id="tableLabel" className="text-lg sm:text-xl lg:text-2xl font-bold text-white-600">Stores</h2>
                
                <br></br>
                <button onClick={openAddModal} className="new-global-btn ">New Store</button>
                <br></br>
                
      
                {contents}
                <br></br>
                <br></br>

               
              <AddStore
                show={showAddModal}
                onClose={closeAddModal}
                onAdd={handleAddStore}
                />
                
                <EditStore
                    show={showEditModal}
                    onClose={closeEditModal}
                    onUpdate={handleUpdateStore}
                    storeToEdit={storeToEdit}
                    
                    />

                <DeleteStore
                    show={showDeleteModal}
                    onClose={closeDeleteModal}
                    onConfirm={handleConfirmDelete}

                    />

                
            </div>
            
        );

    }

export default StoreTable;


