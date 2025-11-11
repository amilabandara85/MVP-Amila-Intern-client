const productEndpoint = "products"; 

const productApiServices = {
    // 1. Fetch all products
    async fetchProducts() {
        try {
            
            const response = await fetch(productEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
        
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch product failed!", error);
            throw new Error("Failed to fetch products");
        }
    },

    // 2. Add a new product 
    async addProduct(productData) {
        const response = await fetch(productEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error('Failed to add product');
        }
        return await response.json();
    },

    // 3. Update an existing product 
    async updateProduct(id, productData) {
        const response = await fetch(`${productEndpoint}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });
       
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
    },

    // 4. Delete a product 
    async deleteProduct(id) {
        const response = await fetch(`${productEndpoint}/${id}`, {
            method: 'DELETE',
        });
       
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
    }
};

export default productApiServices;