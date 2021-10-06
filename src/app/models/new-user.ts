export class NewUser {
  firstName: string | undefined;
  lastName: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  dateOfBirth: string | undefined;
  address: NewUserAddress | undefined;
}

export class NewUserAddress {
  landmark: string | undefined;
  address: string | undefined;
  city: string | undefined;
  state: string | undefined;
  pinCode: string | undefined;
  country: string | undefined;
}
