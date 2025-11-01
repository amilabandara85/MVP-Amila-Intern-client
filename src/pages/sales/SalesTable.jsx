import { Component } from "react";
//import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavMenu } from "../../components/navmenu/NavMenu";

import AddSales from './AddSales';
import EditSales from './EditSales';
import DeleteSales from './DeleteSales';

export class SalesTable extends Component {
    //check class

    static displayName = SalesTable.name;

    constructor(props) {
        super(props);
        this.state = {
            saless: [],
            customers: [],
            products: [],
            stores: [],
            loading: true,

            showAddModal: false,

            showEditModal: false,
            salesToEdit: null,

            showDeleteModal: false,
            saleToDelete: null
        };
    }

    formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    }


    componentDidMount() {
        this.populateSalessData();
        this.populateCustomersData(); // <--- NEW: Fetch customers
        this.populateProductsDropdownData();  // <--- NEW: Fetch products
        this.populateStoresData();   // <--- NEW: Fetch stores
    }

    // NEW: Helper to fetch customer data for dropdown
    async populateCustomersData() {
        // Fetches data from the CustomersController.cs [HttpGet("dropdown")] endpoint
        const response = await fetch('customers');// <-- API Call
        const data = await response.json();
        this.setState({ customers: data });
    }

    // NEW: Helper to fetch product data for dropdown
    async populateProductsDropdownData() {
        try {
            
            const response = await fetch('products');// <-- API Call
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Data will be an array of { id, name } objects, ready for the dropdown.
            this.setState({ products: data });
        } catch (error) {
            console.error("Failed to fetch product dropdown data:", error);
            // Optionally, set an error state or display a user-friendly message
        }
    }

    // NEW: Helper to fetch store data for dropdown
    async populateStoresData() {
        // Fetches data from the StoresController.cs [HttpGet("dropdown")] endpoint
        const response = await fetch('stores');// <-- API Call
        const data = await response.json();
        this.setState({ stores: data });
    }

    openAddModal = () => this.setState({ showAddModal: true });
    closeAddModal = () => this.setState({ showAddModal: false });

    openEditModal = (sales) => this.setState({ showEditModal: true, salesToEdit: sales });
    closeEditModal = () => this.setState({ showEditModal: false, salesToEdit: null });

    openDeleteModal = (sale) => this.setState({ showDeleteModal: true, saleToDelete: sale }); 
    closeDeleteModal = () => this.setState({ showDeleteModal: false, saleToDelete: null });

    renderSalessTable(saless) {
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
                                <td>{sales.customer ? sales.customer.name : 'N/A'}</td>
                                <td>{sales.product ? sales.product.name : 'N/A'}</td>
                                <td>{sales.store ? sales.store.name : 'N/A'}</td>
                                <td>{this.formatDate(sales.dateSold)}</td>

                                <td><button className="edit-btn" onClick={() => this.openEditModal(sales)}>Edit</button></td>
                                <td><button className="delete-btn" onClick={() => this.openDeleteModal(sales)}>Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading.....</em></p>
            : this.renderSalessTable(this.state.saless);

        return (
            <div>
                <br></br>
                <br></br>
                <h2 id="tableLablel" className="text=lg sm:text-xl lg:text-2xl font-bold text-wite-600">Sales</h2>
                <br></br>
                <button onClick={this.openAddModal} className="new-global-btn">New Sales</button>
                <br></br>
                {contents}
                <br></br>
                <br></br>

                <AddSales
                    show={this.state.showAddModal}
                    onClose={this.closeAddModal}
                    onAdd={this.handleAddSales}
                    customers={this.state.customers}
                    products={this.state.products}
                    stores={this.state.stores}
                />

                <EditSales
                    show={this.state.showEditModal}
                    onClose={this.closeEditModal}
                    onUpdate={this.handleUpdateSales}
                    salesToEdit={this.state.salesToEdit}
                    customers={this.state.customers}
                    products={this.state.products}
                    stores={this.state.stores}
                />

                <DeleteSales
                    show={this.state.showDeleteModal}
                    onClose={this.closeDeleteModal}
                    onDelete={this.handleConfirmDelete}
                    sale={this.state.saleToDelete}
                />
            </div>
        );
    }

    //Add
    handleAddSales = async (newSalesData) => {
        await fetch('saless', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSalesData),
        });
        alert('New Sales added');
        this.closeAddModal();
        this.populateSalessData();
    };

    //edit
    handleUpdateSales = async (id, updatedSalesData) => {
        const SalesToUpdate = {
            id: id,
            DateSold: updatedSalesData.DateSold,
            CustomerId: updatedSalesData.CustomerId,
            ProductId: updatedSalesData.ProductId,
            StoreId: updatedSalesData.StoreId
        };

        const response = await fetch(`saless/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(SalesToUpdate),
        });

        if (response.ok) {
            alert('Sales Updated Successfully!');
            this.closeEditModal();
            this.populateSalessData();
        }
        else {
            console.error("Failed to Update:, status, response.status, response. statusText");
            alert('Error: Could not update the Sales');
        }
    };

    //Delete
    handleConfirmDelete = async (id) => {
       
        const saleId = id || this.state.saleToDelete?.id;

        if (!saleId) return;

        const response = await fetch(`saless/${saleId}`, { 
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Sale Deleted successfully!'); 
            this.closeDeleteModal();
            this.populateSalessData();
        } else {
            alert('Error: Could not delete the Sale.');
        }
    };

    async populateSalessData() {
        const response = await fetch('saless');
        const data = await response.json();
        this.setState({ saless: data, loading: false });
    }

}