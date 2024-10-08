import EditInventoryForm from '@/app/_components/EditInventroyForm'
import ProtectedRoute from '@/app/_components/ProtectedRoute'
import React from 'react'

const EditInventory = () => {
    return (
        <ProtectedRoute>
            <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Update Inventory Form</h2>
                <EditInventoryForm />
            </div>
        </ProtectedRoute>
    )
}

export default EditInventory