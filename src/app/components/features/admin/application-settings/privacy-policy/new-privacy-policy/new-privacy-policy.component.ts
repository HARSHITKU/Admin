import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { privacyPolicy } from 'src/app/models/privacyPolicy';
import { PrivacypolicyService } from '../privacypolicy.service';

@Component({
  selector: 'app-new-privacy-policy',
  templateUrl: './new-privacy-policy.component.html',
  styleUrls: ['./new-privacy-policy.component.scss']
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
      isDefault: [false, Validators.required]
    });
    if (this.data.hasOwnProperty('_id')) {
      this.title = 'Update Existing PrivacyPolicy';
      this.buttonText = 'Update PrivacyPolicy';
      this.setFormValue(this.data);
      this.isUpdate = true;
    } else {  
      this.title = 'Add New PrivacyPolicy';
      this.buttonText = 'Add PrivacyPolicy';
      this.isUpdate = false;
    }
   }
   get f(){
    return this.form.controls;
  }

  ngOnInit(): void {
  }
  closeDialog(message: string) {
    this.dialogRef.close(message);
  }
  addUpdateDetails(data: privacyPolicy) {
    let newData = this.generatePayload(data);
    if (this.title === 'Update Existing PrivacyPolicy') {
      this.service
        .updateprivacyPolicy(newData, this.data._id)
        .subscribe((response) => {
          if (response) {
            this.openSnackBar('Data Updated Successfully');
            this.closeDialog(response);
          }
        });
    } else {
      this.service.addprivacyPolicy(newData).subscribe((response) => {
        if (response) {
          this.openSnackBar('Data Added Successfully');
          this.closeDialog(response);
        }
      });
    }
  }
  generatePayload(newDetail: any) {
    let payload = {
      privacyPolicy: newDetail.privacyPolicy,
      isDefault: newDetail.isDefault
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
      duration: 3000
    });
  }
}
