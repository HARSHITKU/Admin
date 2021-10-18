import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Charity } from 'src/app/models/charity';
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
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewCharityComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private charityService: CharityService
  ) {
    this.charityForm = this.fb.group({
      userId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      isVerified: ['', Validators.required],
      earnedChips: ['', Validators.required],
      image: ['', Validators.required],
    });

    if (this.data.hasOwnProperty('id')) {
      this.title = 'Update Existing charity';
      this.buttonText = 'Update charity';
      this.setFormValue(this.data);
      console.log(this.data)
    } else {  
      this.title = 'Add New charity';
      this.buttonText = 'Add charity';
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
      });
    } else {
      this.charityService.addCharity(charityNewDetails).subscribe((response) => {
        if (response) {
          this.isLoading = false;
          this.openSnackBar('charity Data Added Successfully');
          this.closeDialog(response);
        }
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
