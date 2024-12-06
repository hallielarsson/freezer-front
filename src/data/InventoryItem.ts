import { ISODateString } from "./ISODateString";

export type InventoryLocation = 'freezer' | 'pantry' | 'fridge';
export const INVENTORY_OPTIONS = ['freezer', 'pantry', 'fridge'] as InventoryLocation[];

export type InventoryItem = {
  id: string;
  itemName: string;
  category: string;
  purchaseDate: ISODateString;
  location: InventoryLocation | null;
  quantity: number;
  expirationDate: ISODateString | null;
};
