const storeEndpoint = "stores"; 

const storeApiServices = {
    // 1. Fetch all stores
    async fetchStores() {
        try {
            
            const response = await fetch(storeEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
           
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch store failed!", error);
            throw new Error("Failed to fetch stores");
        }
    },

    // 2. Add a new store
    async addStore(storeData) {
        const response = await fetch(storeEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(storeData),
        });
        if (!response.ok) {
            throw new Error('Failed to add store');
        }
        return await response.json();
    },

    // 3. Update an existing store
    async updateStore(id, storeData) {
        const response = await fetch(`${storeEndpoint}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(storeData),
        });
       
        if (!response.ok) {
            throw new Error('Failed to update store');
        }
    },

    // 4. Delete a store
    async deleteStore(id) {
        const response = await fetch(`${storeEndpoint}/${id}`, {
            method: 'DELETE',
        });
       
        if (!response.ok) {
            throw new Error('Failed to delete store');
        }
    }
};

export default storeApiServices;