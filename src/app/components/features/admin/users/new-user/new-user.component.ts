import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UsersService } from '../users.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {

  userForm!: FormGroup;
  title: string = '';
  buttonText: string = '';
  blockStatusText: string = '';
  isLoading: boolean = false;
  isUpdateMode: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  dateString: any;
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
      isBlocked: [false]
    });

    if (this.data.hasOwnProperty('id')) {
      this.title = 'Update Existing User';
      this.buttonText = 'Update User';
      this.setFormValue(this.data);
      this.isUpdateMode = true;
    } else {  
      this.title = 'Add New User';
      this.buttonText = 'Add User';
      this.isUpdateMode = false;
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

  get f(){
    return this.userForm.controls;
  }

  addUpdateUserDetails(userDetails: any) {
    this.isLoading = true;
    let userNewDetails: any = this.generatePayload(userDetails);
    if (this.title === 'Update Existing User') {
      this.usersService
      .updateUser(userNewDetails, this.data.id)
      .subscribe((response) => {
        if (response) {
          this.isLoading = false;
          this.openSnackBar("User Updated Successfully");
          this.closeDialog(response);
        }
      }, error => {
        this.openSnackBar(error.error.message);
      });
    } else {
      this.usersService.addUser(userNewDetails).subscribe((response) => {
        if (response) {
          this.isLoading = false;
          this.openSnackBar("User Added Successfully");
          this.closeDialog(response);
        }
      }, error => {
        this.openSnackBar(error.error.message);
      });
    }
  }

  generatePayload(userDetails: any) {
    let allAddresses: any[] = [];
    let allAddress: any[] = [];

    let address = {
      landmark: userDetails.landmark,
      address: userDetails.address,
      city: userDetails.city,
      state: userDetails.state,
      pinCode: userDetails.pinCode,
      country: userDetails.country,
    }

    allAddresses.push(address);
    allAddress = allAddresses.map(address => {
      return address;
    });

    let user = {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      phone: userDetails.phone,
      email: userDetails.email,
      dateOfBirth: userDetails.dateOfBirth,
      addresses: allAddress,
      isBlocked: userDetails.isBlocked
    };

    return user;
  }

  setFormValue(userDetails: any) {
    if(userDetails.blocked == "Yes"){
      this.blockStatusText = "Unblock User";
    }else{
      this.blockStatusText = "Block User";
    }
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
    this.userForm.get('isBlocked')?.setValue(userDetails.blocked == "Yes" ? true : false);  
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

  convertDate(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
}
