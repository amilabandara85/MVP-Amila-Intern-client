const salesEndpoint = "saless"; 
const customerEndpoint = "customers";
const productEndpoint = "products";
const storeEndpoint = "stores";

const salesApiServices = {
    // 1. Fetch all saless
    async fetchSaless() {
        try {
            
            const response = await fetch(salesEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
           
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch sales failed!", error);
            throw new Error("Failed to fetch saless");
        }
    },

    // 2. Fetch Customer Dropdown Data (from populateCustomersData)
    async fetchCustomersDropdown() {
        try {
            const response = await fetch(customerEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            const data = await response.json();
            // Assuming we only need 'id' and 'name' for the dropdown
            return data.map(c => ({ id: c.id, name: c.name }));
        } catch (error) {
            console.error("Fetch customer dropdown failed!", error);
            throw new Error("Failed to fetch customers for dropdown");
        }
    },

    // 3. Fetch Product Dropdown Data (from populateProductsDropdownData)
    async fetchProductsDropdown() {
        try {
            const response = await fetch(productEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data.map(p => ({ id: p.id, name: p.name }));
        } catch (error) {
            console.error("Fetch product dropdown failed!", error);
            throw new Error("Failed to fetch products for dropdown");
        }
    },

    // 4. Fetch Store Dropdown Data (from populateStoresData)
    async fetchStoresDropdown() {
        try {
            const response = await fetch(storeEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data.map(s => ({ id: s.id, name: s.name }));
        } catch (error) {
            console.error("Fetch store dropdown failed!", error);
            throw new Error("Failed to fetch stores for dropdown");
        }
    },

    // 5. Add a new sales
    async addSales(salesData) {
        const response = await fetch(salesEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(salesData),
        });
        if (!response.ok) {
            throw new Error('Failed to add sales');
        }
        return await response.json();
    },

    // 6. Update an existing sales
    async updateSales(id, salesData) {
        const response = await fetch(`saless/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(salesData),
        });
        if (!response.ok) {
            throw new Error(`Failed to update sales. Status: ${response.status}`);
        }
        
        return { id, ...salesData };
    },

    // 7. Delete a sales
    async deleteSales(id) {
        const response = await fetch(`saless/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            
            throw new Error(`Failed to delete sale. Status: ${response.status}`);
        }
        
        return id;
    },
};

export default salesApiServices;