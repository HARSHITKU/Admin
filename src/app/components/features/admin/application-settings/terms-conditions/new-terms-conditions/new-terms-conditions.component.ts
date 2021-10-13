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
    });
    if (this.data.hasOwnProperty('_id')) {
      this.title = 'Update Existing Terms & Conditions';
      this.buttonText = 'Update Terms & Conditions';
      this.setFormValue(this.data);
    } else {  
      this.title = 'Add New Terms & Conditions';
      this.buttonText = 'Add Terms & Conditions';
    }
  }

  ngOnInit(): void {
  }
  closeDialog(message: string) {
    this.dialogRef.close(message);
  }

  addUpdateDetails(data: TermsConditions) {
    let newData = this.generatePayload(data);
    if (this.title === 'Update Existing Terms & Conditions') {
      this.service
        .updateTerms(newData, this.data._id)
        .subscribe((response) => {
          if (response) {
            this.openSnackBar('Data Updated Successfully');
            this.closeDialog(response);
          }
        });
    } else {
      this.service.addTerms(newData).subscribe((response) => {
        if (response) {
          this.openSnackBar('Data Added Successfully');
          this.closeDialog(response);
        }
      });
    }
  }
  generatePayload(newDetail: any) {
    let payload = {
      termsAndConditions: newDetail.termsAndConditions,
    };
    return payload;
  }
  setFormValue(detailToUpdate: any) {
    this.form.get('termsAndConditions')?.setValue(detailToUpdate.termsAndConditions);
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

}
