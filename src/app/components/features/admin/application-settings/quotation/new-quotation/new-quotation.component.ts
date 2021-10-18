import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Quotation } from 'src/app/models/quotation';
import { QuotationService } from '../quotation.service';

@Component({
  selector: 'app-new-quotation',
  templateUrl: './new-quotation.component.html',
  styleUrls: ['./new-quotation.component.scss']
})
export class NewQuotationComponent implements OnInit {
  form!: FormGroup;
  title: string = '';
  buttonText: string = '';
  isUpdate: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewQuotationComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: QuotationService
  )
  {
    this.form = this.fb.group({
      quotation: ['', Validators.required],
      isDefault: [false, Validators.required]
    });
    if (this.data.hasOwnProperty('_id')) {
      this.title = 'Update Existing Quotation';
      this.buttonText = 'Update Quotation';
      this.setFormValue(this.data);
      this.isUpdate = true;
    } else {  
      this.title = 'Add New Quotation';
      this.buttonText = 'Add Quotation';
      this.isUpdate = false;
    }
  }

  ngOnInit(): void {
  }
  closeDialog(message: string) {
    this.dialogRef.close(message);
  }
  addUpdateDetails(data: Quotation) {
    console.log('form', data)
    let newData = this.generatePayload(data);
    if (this.title === 'Update Existing Quotation') {
      this.service
        .updateQuotation(newData, this.data._id)
        .subscribe((response) => {
          if (response) {
            this.openSnackBar(response.message);
            this.closeDialog(response);
          }
        }, error => {
          this.openSnackBar(error.error.message);
        });
    } else {
      this.service.addQuotation(newData).subscribe((response) => {
        if (response) {
          this.openSnackBar(response.message);
          this.closeDialog(response);
        }
      }, error => {
        this.openSnackBar(error.error.message);
      });
    }
  }
  generatePayload(newDetail: any) {
    let payload = {
      quotation: newDetail.quotation,
      isDefault: newDetail.isDefault
    };
    return payload;
  }
  setFormValue(detailToUpdate: any) {
    this.form.get('quotation')?.setValue(detailToUpdate.quotation);
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
