import { InventoryItem } from '@/data/InventoryItem';
import React from 'react';


interface InventoryListProps {
  items: InventoryItem[];
  status: string;
  error: string | null;
}

const InventoryList: React.FC<InventoryListProps> = ({ items, status, error }) => {
  if (status === 'loading') {
    return <p className="loading-text">Loading...</p>;
  }

  if (status === 'failed') {
    return <p className="error-text">Error: {error}</p>;
  }

  return (
    <div className="inventory-container w-full shadow-custom p-4">
      <h2 className="form-title text-center mb-4">Current Inventory</h2>

      <table className="inventory-table w-full table-auto text-sm">
        <thead>
          <tr>
            <th className="py-2 px-3 text-left w-1/5">Item Name</th>
            <th className="py-2 px-3 text-left w-1/5">Category</th> {/* New column */}
            <th className="py-2 px-3 text-left w-1/5">Location</th>
            <th className="py-2 px-3 text-left w-1/5">Purchase Date</th> {/* New column */}
            <th className="py-2 px-3 text-left w-1/5">Quantity</th> {/* New column */}
            <th className="py-2 px-3 text-left w-1/5">Expiration Date</th> {/* New column */}
            <th className="py-2 px-3 text-right w-1/5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={item.id}
              className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
            >
              <td className="py-2 px-3">{item.itemName}</td>
              <td className="py-2 px-3">{item.category}</td> {/* New cell */}
              <td className="py-2 px-3">{item.location}</td>
              <td className="py-2 px-3">{item.purchaseDate}</td> {/* New cell */}
              <td className="py-2 px-3">{item.quantity}</td> {/* New cell */}
              <td className="py-2 px-3">{item.expirationDate || 'N/A'}</td> {/* New cell */}
              <td className="py-2 px-3 flex justify-end space-x-2">
                <button className="edit-button bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 text-xs">
                  Edit
                </button>
                <button className="delete-button bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 text-xs">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
