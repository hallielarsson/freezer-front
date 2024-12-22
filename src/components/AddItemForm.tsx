import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addInventoryItem } from '../slices/inventorySlice';
import { AppDispatch } from '../store/store';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import clsx from 'clsx';
import { InventoryLocation } from '@/data/InventoryItem';
import { ISODateString } from '@/data/ISODateString';

interface AddItemFormProps {
  inventoryOptions: InventoryLocation[];
  closeModal?: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ inventoryOptions }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Form state
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState<InventoryLocation | ''>('');
  const [expirationDate, setExpirationDate] = useState<ISODateString | undefined>();
  const [error, setError] = useState<string | null>(null); // Error state for validation messages

  // Function to calculate expiration date based on location
  const calculateExpirationDate = (location: InventoryLocation) => {
    const today = new Date();
    switch (location) {
      case 'fridge':
        today.setDate(today.getDate() + 7); // 1 week from today
        break;
      case 'freezer':
        today.setDate(today.getDate() + 21); // 3 weeks from today
        break;
      case 'pantry':
        today.setMonth(today.getMonth() + 6); // 6 months from today
        break;
      default:
        break;
    }
    return today.toISOString().split('T')[0] as ISODateString; // Return in YYYY-MM-DD format
  };

  // Update expiration date when location changes
  useEffect(() => {
    if (location) {
      const expiration = calculateExpirationDate(location);
      setExpirationDate(expiration);
    }
  }, [location]);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();


    if (itemName && location && expirationDate) {
      // Dispatch action to add new item
      dispatch(addInventoryItem({ itemName, location, expirationDate }));
      // Reset form and error state
      setItemName('');
      setLocation('');
      setExpirationDate(undefined);
      setError(null);
    }
  };

  return (
    <div className="form-container w-full max-w-lg mx-auto p-6 shadow-custom rounded-lg bg-white">
      <h2 className="form-title text-center text-xl font-semibold mb-6">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Item Name Input */}
        <div className="mb-4">
          <label htmlFor="itemName" className="block text-sm font-semibold text-gray-700 mb-2">
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="form-input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter item name"
            required
          />
        </div>

        {/* Location Listbox */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
            Location
          </label>
          <Listbox value={location} onChange={setLocation}>
            {({  }) => (
              <div className="relative">
                <ListboxButton className="listbox-button w-full p-3 border border-gray-300 rounded-md text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  {location || 'Select Location'}
                </ListboxButton>
                <ListboxOptions className="listbox-options absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {inventoryOptions.map((loc) => (
                    <ListboxOption key={loc} value={loc}>
                      {({ selected }) => (
                        <div
                          className={clsx(
                            'listbox-option px-4 py-2 text-sm cursor-pointer hover:bg-blue-100',
                            selected && 'bg-blue-200'
                          )}
                        >
                          {loc}
                        </div>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            )}
          </Listbox>
        </div>

        {/* Expiration Date Input */}
        {location && (
          <div className="mb-4">
            <label htmlFor="expirationDate" className="block text-sm font-semibold text-gray-700 mb-2">
              Expiration Date
            </label>
            <input
              type="date"
              id="expirationDate"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value as ISODateString)}
              className="form-input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>} {/* Show error message */}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="button py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
