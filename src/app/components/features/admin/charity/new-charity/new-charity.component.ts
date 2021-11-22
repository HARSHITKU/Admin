import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Charity } from 'src/app/models/charity';
import { UsersService } from '../../users/users.service';
// import { CharityDetails } from 'src/app/models/charity-details';
import { CharityService } from '../charity.service';

@Component({
  selector: 'app-new-charity',
  templateUrl: './new-charity.component.html',
  styleUrls: ['./new-charity.component.scss'],
})
export class NewCharityComponent implements OnInit {

  charityForm!: FormGroup;
  title: string = '';
  buttonText: string = '';
  isLoading: boolean = false;
  isAddNewCharityLoading: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  userDetails: any;
  userId: any;
  charityImage: any;
  newUserMobileNumber: any;
  newUserData: any;
  imageInput: any;
  imageFile: any;
  noUserFound: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewCharityComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private charityService: CharityService,
    private usersService: UsersService,
  ) {
    this.charityForm = this.fb.group({
      userId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      isVerified: ['', Validators.required],
      earnedChips: ['', Validators.required],
      coverImage: ['', Validators.required],
    });

    if (this.data.hasOwnProperty('userId')) {
      this.title = 'Update Existing charity';
      this.buttonText = 'Update charity';
      this.setFormValue(this.data);
      this.userId = this.data.userId
      this.charityImage = this.data.coverImage
    } else {  
      this.title = 'Add New Charity';
      this.buttonText = 'Add';
    }
  }
  get f(){
    return this.charityForm.controls;
  }
  ngOnInit(): void {
    if(this.data.userId) {
      this.usersService.getUser(this.data.userId).subscribe(user => {
        this.userDetails = user.data;
        console.log(user.data);
      })
    }
  }

  closeDialog(message: string) {
    this.dialogRef.close(message);
  }
  closeModal() {
    this.dialogRef.close();
  }

  onSubmit(data:any) {
    this.isAddNewCharityLoading = true;
    this.newUserMobileNumber = data.value.num
    this.usersService.getUserListData().subscribe( res => {
      res.data.map( (user:any) => {
        if(this.newUserMobileNumber === user.phone){
          this.newUserData = user;
          this.isAddNewCharityLoading = false;
          this.noUserFound = false;
        }else {
          this.isAddNewCharityLoading = false;
          this.noUserFound = true;
        }
      })
    })
  }

  onSelectFile(e:any) {
    if(e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e:any) => {
        this.imageFile = e.target.result;
      }
    }
 }

  addUpdatecharityDetails(charityDetails: Charity) {
    this.isLoading = true;
    let charityNewDetails = this.generatePayload(charityDetails);
    if (this.title === 'Update Existing charity') {
      this.charityService
      .updateCharity(charityNewDetails, this.data.id)
      .subscribe((response) => {
        if (response) {
          this.isLoading = false;
          this.openSnackBar('charity Data Updated Successfully');
          this.closeDialog(response);
        }
      }, error => {
        this.isLoading = false
        this.openSnackBar(error.error.message);
      })
    } else {
      this.charityService.addCharity(charityDetails).subscribe((response) => {
        if (response) {
          this.isLoading = false;
          this.openSnackBar('charity Data Added Successfully');
          this.closeDialog(response);
        }else {
          this.isLoading = false;
        }
      },  error => {
        this.isLoading = false
        this.openSnackBar(error.error.message);
      });
    }
  }

  generatePayload(charityDetails: any) {
    let charity = {
      userId: charityDetails.userId,
      name: charityDetails.name,
      description: charityDetails.description,
      status: charityDetails.status,
      isVerified: charityDetails.isVerified,
      coverImage: charityDetails.coverImage,
      earnedChips: charityDetails.earnedChips,
    };
    return charity;
  }

  setFormValue(charityDetails: Charity) {
    this.charityForm.get('earnedChips')?.setValue(charityDetails.earnedChips);
    this.charityForm.get('name')?.setValue(charityDetails.name);
    this.charityForm.get('isVerified')?.setValue(charityDetails.isVerified);
    this.charityForm.get('status')?.setValue(charityDetails.status);
    this.charityForm.get('description')?.setValue(charityDetails.description);
    this.charityForm.get('coverImage')?.setValue(charityDetails.coverImage);
    this.charityForm.get('userId')?.setValue(charityDetails.userId);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }
}
