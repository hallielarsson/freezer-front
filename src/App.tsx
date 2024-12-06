import './App.css'; // Import your custom CSS for styling

function App() {

  // Function to fetch inventory (replace with your actual API call)
  const fetchInventory = async () => {
    // Replace with your API endpoint and data handling
    const response = await fetch('/api/inventory');
    const inventory = await response.json();
    // Update state or display inventory data
    console.log('Inventory:', inventory);
  };

  return (
    <div className="bg-gray-100 text-gray-900">  {/* Apply base styles from old HTML */}
      <div className="container mx-auto p-6">  {/* Apply container class */}
        <h1 className="text-4xl font-bold mb-8 text-center">Pantry Tracker</h1> {/* Title from old HTML */}
        <div className="flex flex-wrap justify-between">
          {/* Add Item Form (replace with your AddItemForm component) */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Add Item</h2>
            <form id="addItemForm">
              <div className="mb-4">
                <label htmlFor="itemName" className="block text-sm font-medium">Item Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" id="itemName" required />
              </div>
              <div className="mb-4">
                <label htmlFor="itemLocation" className="block text-sm font-medium">Location</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" id="itemLocation" required />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">Add Item</button>
            </form>
          </div>

          {/* Inventory List (replace with your InventoryList component) */}
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Current Inventory</h2>
            <ul id="inventoryList" className="space-y-4">
              {/* Inventory items will be dynamically loaded here (use fetched data) */}
            </ul>
          </div>
        </div>

        {/* Button to fetch inventory (optional) */}
        <button onClick={fetchInventory} className="mt-4 bg-blue-500 text-white p-2 rounded-lg">
          Get Inventory Data
        </button>
      </div>
    </div>
  );
}

export default App;