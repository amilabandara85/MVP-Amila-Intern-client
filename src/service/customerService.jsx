const customerEndpoint = "customers"; 

const customerApiServices = {
    // 1. Fetch all customers
    async fetchCustomers() {
        try {
            
            const response = await fetch(customerEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
           
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch customer failed!", error);
            throw new Error("Failed to fetch customers");
        }
    },

    // 2. Add a new customer
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

    // 3. Update an existing customer
    async updateCustomer(id, customerData) {
        const response = await fetch(`${customerEndpoint}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData),
        });
       
        if (!response.ok) {
            throw new Error('Failed to update customer');
        }
    },

    // 4. Delete a customer
    async deleteCustomer(id) {
        const response = await fetch(`${customerEndpoint}/${id}`, {
            method: 'DELETE',
        });
       
        if (!response.ok) {
            throw new Error('Failed to delete customer');
        }
    }
};

export default customerApiServices;