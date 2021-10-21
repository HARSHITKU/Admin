import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TermsConditions } from 'src/app/models/terms-conditions';
import { TermsCoditionService } from '../terms-codition.service';

@Component({
  selector: 'app-new-terms-conditions',
  templateUrl: './new-terms-conditions.component.html',
  styleUrls: ['./new-terms-conditions.component.scss']
})
export class NewTermsConditionsComponent implements OnInit {
  form!: FormGroup;
  title: string = '';
  buttonText: string = '';
  isUpdate: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewTermsConditionsComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: TermsCoditionService
  ) { 
    this.form = this.fb.group({
      termsAndConditions: ['', Validators.required],
      isDefault: [false, Validators.required]
    });

    if (this.data.hasOwnProperty('_id')) {
      this.title = 'Update Terms & Conditions';
      this.buttonText = 'Update';
      this.setFormValue(this.data);
      this.isUpdate = true;
    } else {  
      this.title = 'Add New Terms & Conditions';
      this.buttonText = 'Add';
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

  addUpdateDetails(data: TermsConditions) {
    let newData = this.generatePayload(data);
    if (this.title === 'Update Terms & Conditions') {
      this.service
        .updateTerms(newData, this.data._id)
        .subscribe((response) => {
          if (response) {
            this.openSnackBar("Terms & Conditions Updated Successfully");
            this.closeDialog(response);
          }
        }, error => {
          this.openSnackBar(error.error.message);
        });
    } else {
      this.service.addTerms(newData).subscribe((response) => {
        if (response) {
          this.openSnackBar("Terms & Conditions Added Successfully");
          this.closeDialog(response);
        }
      }, error => {
        this.openSnackBar(error.error.message);
      });
    }
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

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

}
