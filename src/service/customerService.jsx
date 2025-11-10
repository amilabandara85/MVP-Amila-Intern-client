const customerEndpoint = "api/Customers"; // Base path to the C# controller

const customerApiServices = {
    // 1. Fetch all customers (Read)
    async fetchCustomers() {
        try {
            // Note: The C# controller GetProducts is mapped to the 'Api/Customers' route
            const response = await fetch(customerEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            // The C# controller GetProducts returns an array of objects
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch customer failed!", error);
            throw new Error("Failed to fetch customers");
        }
    },

    // 2. Add a new customer (Create)
    async addCustomer(customerData) {
        const response = await fetch(customerEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData),
        });
        if (!response.ok) {
            throw new Error('Failed to add customer');
        }
        return await response.json();
    },

    // 3. Update an existing customer (Update)
    async updateCustomer(id, customerData) {
        const response = await fetch(`${customerEndpoint}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData),
        });
        // The C# controller PutCustomer returns NoContent (204) on success
        if (!response.ok) {
            throw new Error('Failed to update customer');
        }
    },

    // 4. Delete a customer (Delete)
    async deleteCustomer(id) {
        const response = await fetch(`${customerEndpoint}/${id}`, {
            method: 'DELETE',
        });
        // The C# controller DeleteCustomer returns NoContent (204) on success
        if (!response.ok) {
            throw new Error('Failed to delete customer');
        }
    }
};

export default customerApiServices;