import { ISODateString } from "./ISODateString";

export type InventoryLocation = 'freezer' | 'pantry' | 'fridge';
export const INVENTORY_OPTIONS = ['freezer', 'pantry', 'fridge'] as InventoryLocation[];

export type InventoryItem = {
  id: string;  // UUID string
  itemName: string;  // Name of the item
  category: string;  // Category of the item
  purchaseDate: ISODateString;  // Date of purchase
  location: string | null;  // Location of the item (nullable)
  quantity: number;  // Quantity of the item
  expirationDate: ISODateString | null;  // Expiration date (nullable)
  createdAt: ISODateString;  // Timestamp when the item was created
  modifiedAt: ISODateString;  // Timestamp for last modification
  creatorId: string;  // Creator's user ID (foreign key to User)
};

export const EXAMPLE_ITEM: InventoryItem = {
  id: "f7fef740-4626-4b5e-ae3d-c9a3b0326e02",
  itemName: "Frozen Pizza",
  category: "Food",
  purchaseDate: "2024-12-16T12:00:00Z",
  location: "freezer",
  quantity: 5,
  expirationDate: "2025-01-01T12:00:00Z",
  createdAt: "2024-12-16T12:00:00Z",
  modifiedAt: "2024-12-16T12:30:00Z",
  creatorId: "fe3a47d2-b30e-4df6-92c7-07c6fd1e3819",  // Example creator ID (UUID)
};
