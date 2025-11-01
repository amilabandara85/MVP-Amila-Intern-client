import { Component } from "react";
//import React, {useState} from "react";
import { Collapse, Navbar, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavMenu } from "../../components/navmenu/NavMenu";

import AddProduct from'./AddProduct';
import EditProduct from'./EditProduct';
import DeleteProduct from'./DeleteProduct';

export class ProductTable extends Component {

    static displayName = ProductTable.name;

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true,

            showAddModal: false,

            showEditModal: false,
            productToEdit: null,

            showDeleteModal: false,
            productToDeleteId: null
        };
    }

    componentDidMount() {
        this.populateProductsData();
    }

    openAddModal = () => this.setState({ showAddModal: true});
    closeAddModal = () => this.setState({ showAddModal: false});

    openEditModal = (product) => this.setState({showEditModal: true, productToEdit:product});
    closeEditModal = () => this.setState({ showEditModal: false, productToEdit: null});

    openDeleteModal = (id) => this.setState({ showDeleteModal:true, productToDeleteId:id});
    closeDeleteModal = () => this.setState({ showDeleteModal:false, productToDeleteId: null});

    renderProductsTable(products) {
        return (
            <div className="global-container">
                <table className="global-table table table-striped" aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product =>
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>

                                <td><button className="edit-btn" onClick={() => this.openEditModal(product)}>Edit</button></td>
                                <td><button className="delete-btn" onClick={() => this.openDeleteModal(product.id)}>Delete</button></td>
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
        : this.renderProductsTable(this.state.products);

        return (
            <div>
                <br></br>
                <br></br>
                <h2 id="tableLablel" className="text=lg sm:text-xl lg:text-2xl font-bold text-wite-600">Product</h2>
                <br></br>
                <button onClick={this.openAddModal} className="new-global-btn">New Product</button>
                <br></br>
                {contents}
                <br></br>
                <br></br>

                <AddProduct
                show={this.state.showAddModal}
                onClose={this.closeAddModal}
                onAdd={this.handleAddProduct}
                />

                <EditProduct
                show={this.state.showEditModal}
                onClose={this.closeEditModal}
                onUpdate={this.handleUpdateProduct}
                productToEdit={this.state.productToEdit}
                />

                <DeleteProduct
                show={this.state.showDeleteModal}
                onClose={this.closeDeleteModal}
                onConfirm={this.handleConfirmDelete}
                />
            </div>
        );
    }

    //Add
    handleAddProduct = async (newProductData) => {
        await fetch('products', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newProductData),
        });
        alert('New Product added');
        this.closeAddModal();
        this.populateProductsData();
    };

    //edit
    handleUpdateProduct = async (id, updatedProductData) => {
        const productToUpdate ={
            id: id,
            name: updatedProductData.name,
            price: updatedProductData.price
        };

        const response = await fetch(`products/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(productToUpdate),
        });

        if (response.ok) {
            alert('Product Updated Successfully!');
            this.closeEditModal();
            this.populateProductsData();
        }
        else {
            console.error("Failed to Update:, status, response.status, response. statusText");
            alert('Error: Could not update the Product');
        }
    };

    //Delete
    handleConfirmDelete = async () => {
        const {productToDeleteId} = this.state;
        await fetch(`products/${productToDeleteId}`, {
            method: 'DELETE',
        });
        alert('Prodeuc Deleted !');
        this.closeDeleteModal();
        this.populateProductsData();
    };

    async populateProductsData () {
        const response = await fetch('products');
        const data = await response.json();
        this.setState({ products: data, loading: false});
    }
    
}