export class UserDetails
{
  status: string | undefined;
  data: User | undefined;
}

export class User {
    profileImage: string | undefined;
    role:  string | undefined;
    chips: number | undefined;
    winnedChips: number | undefined;
    availableChipsToRedeem: number | undefined;
    isActive: boolean | undefined;
    _id:  string | undefined;
    firstName:string | undefined;
    lastName: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    dateOfBirth: string | undefined;
    address: UserAddress | undefined;
    password: string | undefined;
    passwordConfirm: string | undefined;
    __v: number | undefined;
    createdAt: string | undefined;
    updatedAt: string | undefined;
}

export class UserAddress
{
  _id: string | undefined;
  type: string | undefined;
  coordinates: any | undefined;
  landmark:string | undefined;
  address: string | undefined;
  city: string | undefined;
  state: string | undefined;
  pinCode: string | undefined;
  country: string | undefined;
}