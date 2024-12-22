import { InventoryItem } from "./InventoryItem";
import { ISODateString } from "./ISODateString";

export type User = {
  id: string;  // User ID (UUID)
  discordId: string;  // Discord user ID
  householdId: string;  // Household ID (foreign key to Household)
  createdAt: ISODateString;  // Timestamp for user creation
  updatedAt: ISODateString | null;  // Timestamp for user update (nullable)
  username: string | null;  // Username (nullable)
  email: string;  // User's email address
  items: InventoryItem[];  // Array of items created by the user
};

export const EXAMPLE_USER: User = {
  id: "fe3a47d2-b30e-4df6-92c7-07c6fd1e3819",
  discordId: "123456789012345678",
  householdId: "f7fef740-4626-4b5e-ae3d-c9a3b0326e02",  // Example household ID
  createdAt: "2024-12-16T12:00:00Z",
  updatedAt: "2024-12-16T12:30:00Z",
  username: "john_doe",
  email: "johndoe@example.com",
  items: [],  // Array of items this user has created
};
