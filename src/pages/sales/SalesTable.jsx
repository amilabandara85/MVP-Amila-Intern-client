import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';
import { NavMenu } from "../../components/navmenu/NavMenu";

import {
    fetchSalessAsync,
    addSalesAsync,
    updateSalesAsync,
    deleteSalesAsync,
    fetchCustomersDropdownAsync,
    fetchProductsDropdownAsync,
    fetchStoresDropdownAsync,
} from '../../redux_slice/SalesSlice';

import AddSales from './AddSales';
import EditSales from './EditSales';
import DeleteSales from './DeleteSales';

export function SalesTable () {

    // Redux Hooks to access state and dispatch actions
    const dispatch = useDispatch();
    const {
        saless,
        customers,
        products,
        stores,
        loading,
        error
    } = useSelector((state) => state.salesDetails);

    // Local UI State for Modals
   
    const [showAddModal, setShowAddModal] = React.useState(false);

    const [showEditModal, setShowEditModal] = React.useState(false);
    const [salesToEdit, setSalesToEdit] = React.useState(null);

    const [saleToDelete, setSaleToDelete] = React.useState(null);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);


    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    }

    useEffect(() => {
        dispatch(fetchSalessAsync());
        dispatch(fetchCustomersDropdownAsync());
        dispatch(fetchProductsDropdownAsync());
        dispatch(fetchStoresDropdownAsync());
    }, [dispatch]);

  
    const openAddModal = () => setShowAddModal(true);
    const closeAddModal = () => setShowAddModal(false);

    const openEditModal = (sales) => { setShowEditModal(true); setSalesToEdit(sales); };
    const closeEditModal = () => { setShowEditModal(false); setSalesToEdit(null); };

    const openDeleteModal = (sale) => { setSaleToDelete(sale); setShowDeleteModal(true); };
    const closeDeleteModal = () => { setShowDeleteModal(false); setShowDeleteModal(null); };

    // 1. Add HANDLER
    const handleAddSales = async (newSalesData) => {
        
        try {
            await dispatch(addSalesAsync(newSalesData)).unwrap();

            
            alert('New Sale added successfully!');
            closeAddModal();

        } catch (error) {
            
            console.error("Failed to add sale:", error);
            alert(`Error: Failed to add sale. ${error.message || ''}`);
        }
    };

    // 2. UPDATE HANDLER
    const handleUpdateSales = async (id, updatedSalesData) => {

        
        const fullUpdateData = {
            ...updatedSalesData,
            id: id 
        };

        dispatch(updateSalesAsync({ id, updatedSalesData: fullUpdateData })) 
            .unwrap()
            .then(() => {
                alert('Sale Updated Successfully!');
                closeEditModal();
            })
            .catch((error) => {
                console.error("Failed to update sale:", error);
                alert(`Error: Could not update the Sale: ${error.message || ''}`);
            });
    };

    // 3. DELETE HANDLER
    const handleConfirmDelete = (id) => {
       
        dispatch(deleteSalesAsync(id)) 
            .unwrap()
            .then(() => {
                alert('Sale Deleted successfully!');
                closeDeleteModal();
            })
            .catch((error) => {
                console.error("Failed to delete sale:", error);
                alert(`Error: Could not delete the Sale: ${error.message || ''}`);
            });
    };

    // Helper functions to map IDs to Names for display
    const getCustomerName = (id) => customers.find(c => c.id === id)?.name || 'N/A';
    const getProductName = (id) => products.find(p => p.id === id)?.name || 'N/A';
    const getStoreName = (id) => stores.find(s => s.id === id)?.name || 'N/A';


    const renderSalesTable = (saless) => {
        return (
            <div className="global-container">
                <table className="global-table table table-striped" aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Store</th>
                            <th>Date Sold</th>
                            <th>Actions</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {saless.map(sales =>
                            <tr key={sales.id}>
                                <td>{sales.id}</td>
                                <td>{getCustomerName(sales.customerId)}</td>
                                <td>{getProductName(sales.productId)}</td>
                                <td>{getStoreName(sales.storeId)}</td>
                                <td>{formatDate(sales.dateSold)}</td>

                                <td><button className="edit-btn" onClick={() => openEditModal(sales)}>Edit</button></td>
                                <td><button className="delete-btn" onClick={() => openDeleteModal(sales)}>Delete</button></td>
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
    }
    else {
        contents = renderSalesTable(saless);
    }

        return (
            <div>
                <br></br>
                <br></br>
                <h2 id="tableLabel" className="text=lg sm:text-xl lg:text-2xl font-bold text-wite-600">Sales</h2>
                <br></br>
                <button onClick={openAddModal} className="new-global-btn">New Sales</button>
                <br></br>
                {contents}
                <br></br>
                <br></br>

                <AddSales
                    show={showAddModal}
                    onClose={closeAddModal}
                    onAdd={handleAddSales}
                    customers={customers}
                    products={products}
                    stores={stores}
                />

                <EditSales
                    show={showEditModal}
                    onClose={closeEditModal}
                    onUpdate={handleUpdateSales}
                    salesToEdit={salesToEdit}
                    customers={customers}
                    products={products}
                    stores={stores}
                />

                <DeleteSales
                    show={showDeleteModal}
                    onClose={closeDeleteModal}
                    onDelete={handleConfirmDelete}
                    sale={saleToDelete}
                />
            </div>
        );
    }

   