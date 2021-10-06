import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { UserDetails } from 'src/app/models/user-details';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {

  userForm!: FormGroup;
  title: string = '';
  buttonText: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  states: any[] = [
    {
      id: 1,
      name: 'Uttar Pradesh',
    },
    {
      id: 2,
      name: 'Maharashtra',
    },
  ];
  countries: any[] = [
    {
      id: 1,
      name: 'India',
    },
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewUserComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      landmark: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required],
      country: ['', Validators.required],
    });

    if (this.data.hasOwnProperty('id')) {
      this.title = 'Update Existing User';
      this.buttonText = 'Update User';
      this.setFormValue(this.data);
    } else {  
      this.title = 'Add New User';
      this.buttonText = 'Add User';
    }
  }

  ngOnInit(): void {
  }

  closeDialog(message: string) {
    this.dialogRef.close(message);
  }
  closeModal() {
    this.dialogRef.close();
  }

  addUpdateUserDetails(userDetails: User) {
    let userNewDetails = this.generatePayload(userDetails);
    if (this.title === 'Update Existing User') {
      this.usersService
        .updateUser(userNewDetails, this.data.id)
        .subscribe((response) => {
          if (response) {
            this.openSnackBar('User Data Updated Successfully');
            this.closeDialog(response);
          }
        });
    } else {
      this.usersService.addUser(userNewDetails).subscribe((response) => {
        if (response) {
          this.openSnackBar('User Data Added Successfully');
          this.closeDialog(response);
        }
      });
    }
  }

  generatePayload(userDetails: any) {
    let user = {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      phone: userDetails.phone,
      email: userDetails.email,
      dateOfBirth: userDetails.dateOfBirth,
      address: {
        landmark: userDetails.landmark,
        address: userDetails.address,
        city: userDetails.city,
        state: userDetails.state,
        pinCode: userDetails.pinCode,
        country: userDetails.country,
      },
    };
    return user;
  }

  setFormValue(userDetails: any) {
    this.userForm.get('firstName')?.setValue(userDetails.firstName);
    this.userForm.get('lastName')?.setValue(userDetails.lastName);
    this.userForm.get('dateOfBirth')?.setValue(userDetails.dateOfBirth);
    this.userForm.get('email')?.setValue(userDetails.email);
    this.userForm.get('landmark')?.setValue(userDetails.landmark);
    this.userForm.get('phone')?.setValue(userDetails.phone);
    this.userForm.get('pinCode')?.setValue(userDetails.pinCode);
    this.userForm.get('address')?.setValue(userDetails.address);
    this.userForm.get('city')?.setValue(userDetails.city);
    this.userForm.get('state')?.setValue(userDetails.state);
    this.userForm.get('country')?.setValue(userDetails.country);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }
}
