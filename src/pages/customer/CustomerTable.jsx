import { Component } from "react";
//import React, {useState} from "react";
import { Collapse, Navbar, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavMenu } from "../../components/navmenu/NavMenu";

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';

export class CustomerTable extends Component {

    static displayName = CustomerTable.name;

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            loading: true,

            showAddModal: false,

            showEditModal: false,
            customerToEdit: null,

            showDeleteModal: false,
            customerToDeleteId: null
        };
    }

    componentDidMount() {
        this.populateCustomersData();
    }

    openAddModal = () => this.setState({ showAddModal: true });
    closeAddModal = () => this.setState({ showAddModal: false });

    openEditModal = (customer) => this.setState({ showEditModal: true, customerToEdit: customer });
    closeEditModal = () => this.setState({ showEditModal: false, customerToEdit: null });

    openDeleteModal = (id) => this.setState({ showDeleteModal: true, customerToDeleteId: id });
    closeDeleteModal = () => this.setState({ showDeleteModal: false, customerToDeleteId: null });

    renderCustomersTable(customers) {
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

                                <td><button className="edit-btn" onClick={() => this.openEditModal(customer)}>Edit</button></td>
                                <td><button className="delete-btn" onClick={() => this.openDeleteModal(customer.id)}>Delete</button></td>
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
            : this.renderCustomersTable(this.state.customers);

        return (
            <div>
                <br></br>
                <br></br>
                <h2 id="tableLablel" className="text=lg sm:text-xl lg:text-2xl font-bold text-wite-600">Customer</h2>
                <br></br>
                <button onClick={this.openAddModal} className="new-global-btn">New Customer</button>
                <br></br>
                {contents}
                <br></br>
                <br></br>

                <AddCustomer
                    show={this.state.showAddModal}
                    onClose={this.closeAddModal}
                    onAdd={this.handleAddCustomer}
                />

                <EditCustomer
                    show={this.state.showEditModal}
                    onClose={this.closeEditModal}
                    onUpdate={this.handleUpdateCustomer}
                    customerToEdit={this.state.customerToEdit}
                />

                <DeleteCustomer
                    show={this.state.showDeleteModal}
                    onClose={this.closeDeleteModal}
                    onConfirm={this.handleConfirmDelete}
                />
            </div>
        );
    }

    //Add
    handleAddCustomer = async (newCustomerData) => {
        await fetch('customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCustomerData),
        });
        alert('New Customer added');
        this.closeAddModal();
        this.populateCustomersData();
    };

    //edit
    handleUpdateCustomer = async (id, updatedCustomerData) => {
        const customerToUpdate = {
            id: id,
            name: updatedCustomerData.name,
            price: updatedCustomerData.price
        };

        const response = await fetch(`customers/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerToUpdate),
        });

        if (response.ok) {
            alert('Customer Updated Successfully!');
            this.closeEditModal();
            this.populateCustomersData();
        }
        else {
            console.error("Failed to Update:, status, response.status, response. statusText");
            alert('Error: Could not update the Customer');
        }
    };

    //Delete
    handleConfirmDelete = async () => {
        const { customerToDeleteId } = this.state;
        await fetch(`customers/${customerToDeleteId}`, {
            method: 'DELETE',
        });
        alert('Prodeuc Deleted !');
        this.closeDeleteModal();
        this.populateCustomersData();
    };

    async populateCustomersData() {
        const response = await fetch('customers');
        const data = await response.json();
        this.setState({ customers: data, loading: false });
    }

}