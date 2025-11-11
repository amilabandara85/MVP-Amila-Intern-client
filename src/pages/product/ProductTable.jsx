import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';
import { NavMenu } from "../../components/navmenu/NavMenu";

import {
    fetchProductsAsync,
    addProductAsync,
    updateProductAsync,
    deleteProductAsync,
} from '../../redux_slice/productslice'; 

import AddProduct from'./AddProduct';
import EditProduct from'./EditProduct';
import DeleteProduct from'./DeleteProduct';

export function ProductTable() {

    // Redux Hooks
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.productDetails);

    // Local UI State (still managed via useState)
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [productToEdit, setProductToEdit] = React.useState(null);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [productToDeleteId, setProductToDeleteId] = React.useState(null);


    // Fetch data on component mount (equivalent to componentDidMount)
    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch]);


    // --- MODAL HANDLERS ---
    const openAddModal = () => setShowAddModal(true);
    const closeAddModal = () => setShowAddModal(false);

    const openEditModal = (product) => {
        setShowEditModal(true);
        setProductToEdit(product);
    };
    const closeEditModal = () => {
        setShowEditModal(false);
        setProductToEdit(null);
    };

    const openDeleteModal = (id) => {
        setShowDeleteModal(true);
        setProductToDeleteId(id);
    };
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setProductToDeleteId(null);
    };


    // --- CRUD HANDLERS (Dispatching Redux Thunks) ---

    // Add
    const handleAddProduct = async (newProductData) => {
        await dispatch(addProductAsync(newProductData));
        alert('New Product added'); // Use Redux success/error handling for better UX
        closeAddModal();
        // Redux slice handles state update, no need to manually call fetch
    };

    // Edit
    const handleUpdateProduct = async (id, updatedProductData) => {
        const productToUpdate = {
            id: id,
            name: updatedProductData.name,
            price: updatedProductData.price
        };
        // Dispatch the thunk with the ID and the new data
        const resultAction = await dispatch(updateProductAsync({
            id: id,
            updatedProductData: productToUpdate
        }));

        if (updateProductAsync.fulfilled.match(resultAction)) {
            alert('Product Updated Successfully!');
        } else {
            console.error("Failed to Update:", resultAction.payload);
            alert('Error: Could not update the Product');
        }
        closeEditModal();
        // Redux slice handles state update
    };

    // Delete
    const handleConfirmDelete = async () => {
        await dispatch(deleteProductAsync(productToDeleteId));
        alert('Product Deleted!');
        closeDeleteModal();

    };

    const renderProductsTable = (products) => {
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

                                <td><button className="edit-btn" onClick={() => openEditModal(product)}>Edit</button></td>
                                <td><button className="delete-btn" onClick={() => openDeleteModal(product.id)}>Delete</button></td>
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
            contents = renderProductsTable(products);
        }

        return (
            <div>
                <br></br>
                <br></br>
                <h2 id="tableLabel" className="text=lg sm:text-xl lg:text-2xl font-bold text-wite-600">Product</h2>
                <br></br>
                <button onClick={openAddModal} className="new-global-btn">New Product</button>
                <br></br>
                {contents}
                <br></br>
                <br></br>

                <AddProduct
                show={showAddModal}
                onClose={closeAddModal}
                onAdd={handleAddProduct}
                />

                <EditProduct
                show={showEditModal}
                onClose={closeEditModal}
                onUpdate={handleUpdateProduct}
                productToEdit={productToEdit}
                />

                <DeleteProduct
                show={showDeleteModal}
                onClose={closeDeleteModal}
                onConfirm={handleConfirmDelete}
                />
            </div>
        );
    }

    export default ProductTable;