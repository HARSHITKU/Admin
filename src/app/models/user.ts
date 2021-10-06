import { Address } from "./address";

export class User {
  profileImage: string | undefined;
  role: string | undefined;
  chips: number | undefined;
  winnedChips: number | undefined;
  availableChipsToRedeem: number | undefined;
  isActive: boolean | undefined;
  _id: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  dateOfBirth!: string;
  address: Address | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
}
