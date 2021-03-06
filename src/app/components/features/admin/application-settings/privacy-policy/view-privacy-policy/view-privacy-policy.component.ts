import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-privacy-policy',
  templateUrl: './view-privacy-policy.component.html',
  styleUrls: ['./view-privacy-policy.component.scss']
})
export class ViewPrivacyPolicyComponent implements OnInit {
  form!: FormGroup;
  buttonText: string = '';
  userDetails: any;
  isUpdate: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,public dialogRef: MatDialogRef<ViewPrivacyPolicyComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ){
      this.form = this.fb.group({
         
        isDefault: [false, Validators.required]
      });
   }
   ngOnInit(): void {
    this.userDetails = this.data;
  }
  closeDialog(message: string) {
    this.dialogRef.close(message);
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

}
