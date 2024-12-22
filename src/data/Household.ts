import { ISODateString } from "./ISODateString";
import { User } from "./User";

export type Household = {
  id: string;  // UUID string for household
  discordServerId: string;  // Discord server ID
  createdAt: ISODateString;  // Timestamp for creation
  modifiedAt: ISODateString;  // Timestamp for last modification
  users: User[];  // Array of users related to this household
};

export const EXAMPLE_HOUSEHOLD: Household = {
  id: "f7fef740-4626-4b5e-ae3d-c9a3b0326e02",
  discordServerId: "123456789012345678",
  createdAt: "2024-12-16T12:00:00Z",
  modifiedAt: "2024-12-16T12:30:00Z",
  users: [], // Array of users
};
