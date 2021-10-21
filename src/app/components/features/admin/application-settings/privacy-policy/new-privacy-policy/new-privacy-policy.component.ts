import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { PrivacypolicyService } from '../privacypolicy.service';

@Component({
  selector: 'app-new-privacy-policy',
  templateUrl: './new-privacy-policy.component.html',
  styleUrls: ['./new-privacy-policy.component.scss'],
})
export class NewPrivacyPolicyComponent implements OnInit {

  form!: FormGroup;
  title: string = '';
  buttonText: string = '';
  isUpdate: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewPrivacyPolicyComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: PrivacypolicyService
  ) {
    this.form = this.fb.group({
      privacyPolicy: ['', Validators.required],
      isDefault: [false, Validators.required],
    });

    if (this.data.hasOwnProperty('_id')) {
      this.title = 'Update Existing Privacy Policy';
      this.buttonText = 'Update';
      this.setFormValue(this.data);
      this.isUpdate = true;
    } else {
      this.title = 'Add New Privacy Policy';
      this.buttonText = 'Add';
      this.isUpdate = false;
    }
   }
   get f(){
    return this.form.controls;
  }

  ngOnInit(): void {}
  
  closeDialog(message: string) {
    this.dialogRef.close(message);
  }

  addUpdateDetails(data: any) {
    let newData = this.generatePayload(data);
    if (this.title === 'Update Existing Privacy Policy') {
      this.service.updateprivacyPolicy(newData, this.data._id).subscribe(
        (response) => {
          if (response) {
            this.openSnackBar(response.message);
            this.closeDialog(response);
          }
        },
        (error) => {
          this.openSnackBar(error.error.message);
        }
      );
    } else {
      this.service.addprivacyPolicy(newData).subscribe(
        (response) => {
          if (response) {
            this.openSnackBar(response.message);
            this.closeDialog(response);
          }
        },
        (error) => {
          this.openSnackBar(error.error.message);
        }
      );
    }
  }

  generatePayload(newDetail: any) {
    let payload = {
      privacyPolicy: newDetail.privacyPolicy,
      isDefault: newDetail.isDefault,
    };
    return payload;
  }

  setFormValue(detailToUpdate: any) {
    this.form.get('privacyPolicy')?.setValue(detailToUpdate.privacyPolicy);
    this.form.get('isDefault')?.setValue(detailToUpdate.isDefault);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
