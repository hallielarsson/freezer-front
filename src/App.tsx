// src/App.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import './App.scss'; // Importing SCSS for custom styling
import { fetchInventory } from './slices/inventorySlice';
import { AppDispatch } from './store/store';
import AddItemForm from './components/AddItemForm';
import { Dialog, DialogTitle } from '@headlessui/react'; // Correctly import Dialog from Headless UI
import InventoryList from './components/InventoryList'; // Import the InventoryList component
import { INVENTORY_OPTIONS } from './data/InventoryItem';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.inventory);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="text-gray-900">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Freezer App</h1>

        {/* Add Item Button */}
        <div className="text-center mb-6">
          <button 
            className="add-item-button py-2 px-4 bg-blue-500 text-white rounded-sm hover:bg-blue-600 small" 
            onClick={openModal}
          >
            Add Item
          </button>
        </div>

        {/* Inventory List Component */}
        <InventoryList items={items} status={status} error={error} />

        {/* Modal for Add Item Form */}
        <Dialog open={isModalOpen} onClose={closeModal}>
          <div className="modal-content fixed inset-1/4 bg-white p-6 rounded-sm w-full max-w-md">
            <DialogTitle className="text-xl font-bold mb-4">Add New Item</DialogTitle>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              X
            </button>
            <AddItemForm inventoryOptions={INVENTORY_OPTIONS} closeModal={closeModal} />
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default App;
