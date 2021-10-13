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
    });
    if (this.data.hasOwnProperty('_id')) {
      this.title = 'Update Existing Quotation';
      this.buttonText = 'Update Quotation';
      this.setFormValue(this.data);
    } else {  
      this.title = 'Add New Quotation';
      this.buttonText = 'Add Quotation';
    }
  }

  ngOnInit(): void {
  }
  closeDialog(message: string) {
    this.dialogRef.close(message);
  }
  addUpdateDetails(data: Quotation) {
    let newData = this.generatePayload(data);
    if (this.title === 'Update Existing Quotation') {
      this.service
        .updateQuotation(newData, this.data._id)
        .subscribe((response) => {
          if (response) {
            this.openSnackBar('Data Updated Successfully');
            this.closeDialog(response);
          }
        });
    } else {
      this.service.addQuotation(newData).subscribe((response) => {
        if (response) {
          this.openSnackBar('Data Added Successfully');
          this.closeDialog(response);
        }
      });
    }
  }
  generatePayload(newDetail: any) {
    let payload = {
      quotation: newDetail.quotation,
    };
    return payload;
  }
  setFormValue(detailToUpdate: any) {
    this.form.get('quotation')?.setValue(detailToUpdate.quotation);
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }
}
