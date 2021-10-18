import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Redeem } from 'src/app/models/redeem';
import { RedeemService } from '../redeem.service';
@Component({
  selector: 'app-new-redeem',
  templateUrl: './new-redeem.component.html',
  styleUrls: ['./new-redeem.component.scss']
})
export class NewRedeemComponent implements OnInit {
  userForm!: FormGroup;
  title: string = '';
  buttonText: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewRedeemComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: RedeemService
  ) { 
    this.userForm = this.fb.group({
      products: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    if (this.data.hasOwnProperty('_id')) {
      this.title = 'Update Existing Redeem';
      this.buttonText = 'Update Redeem';
      this.setFormValue(this.data);
    } else {  
      this.title = 'Add New Redeem';
      this.buttonText = 'Add Redeem';
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
  addUpdateDetails(RedeemDetails: Redeem) {
    let newData = this.generatePayload(RedeemDetails);
    if (this.title === 'Update Existing redeem') {
      this.service
        .updateRedeem(newData, this.data._id)
        .subscribe((response) => {
          if (response) {
            this.openSnackBar('Data Updated Successfully');
            this.closeDialog(response);
          }
        });
    } else {
      this.service.addRedeem(newData).subscribe((response) => {
        if (response) {
          this.openSnackBar('Data Added Successfully');
          this.closeDialog(response);
        }
      });
    }
  }
  generatePayload(RedeemDetails: any) {
    let redeem = {
      products: RedeemDetails.products,
      name : RedeemDetails.name,
      description: RedeemDetails.description
    };
    return redeem;
  }

  setFormValue(RedeemDetails: any) {
    this.userForm.get('products')?.setValue(RedeemDetails.products);
    this.userForm.get('name')?.setValue(RedeemDetails.firstName);

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }
}
