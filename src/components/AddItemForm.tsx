import React, { useState } from 'react';

interface AddItemFormProps {
  onSubmit: (itemName: string, itemLocation: string) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onSubmit }) => {
  const [itemName, setItemName] = useState('');
  const [itemLocation, setItemLocation] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(itemName, itemLocation);
    setItemName('');
    setItemLocation('');
  };

  return (
    <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="itemName" className="block text-sm font-medium">Item Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="itemLocation" className="block text-sm font-medium">Location</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            id="itemLocation"
            value={itemLocation}
            onChange={(e) => setItemLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemForm;