import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-terms-conditions',
  templateUrl: './view-terms-conditions.component.html',
  styleUrls: ['./view-terms-conditions.component.scss']
})
export class ViewTermsConditionsComponent implements OnInit {
  title: string = "View";
  form!: FormGroup;
  buttonText: string = '';
  userDetails: any;
  isUpdate: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,public dialogRef: MatDialogRef<ViewTermsConditionsComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ){
      this.form = this.fb.group({         
        isDefault: [false, Validators.required]
      });
      if(this.data.hasOwnProperty('_id')) {
        this.setFormValue(this.data);
      };
   }
   ngOnInit(): void {
    this.userDetails = this.data;
  }
  closeDialog(message: string) {
    this.dialogRef.close(message);
  }
  generatePayload(newDetail: any) {
    let payload = {
      termsAndConditions: newDetail.termsAndConditions,
      isDefault: newDetail.isDefault
    };
    return payload;
  }
  
  setFormValue(detailToUpdate: any) {
    this.form.get('termsAndConditions')?.setValue(detailToUpdate.termsAndConditions);
     this.form.get('isDefault')?.setValue(detailToUpdate.isDefault);
  }

}
