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
    
    if (this.data.hasOwnProperty('id')) {
      this.title = 'Update Quotation';
      this.buttonText = 'Update';
      this.setFormValue(this.data);
      this.isUpdate = true;
    } else {  
      this.title = 'Add New Quotation';
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

  addUpdateDetails(data: Quotation) {
    let newData = this.generatePayload(data);
    if (this.title === 'Update Quotation') {
      this.service
        .updateQuotation(newData, this.data.id)
        .subscribe((response) => {
          if (response) {
            this.openSnackBar("Quotation Updated Successfully");
            this.closeDialog(response);
          }
        }, error => {
          this.openSnackBar(error.error.message);
        });
    } else {
      this.service.addQuotation(newData).subscribe((response) => {
        if (response) {
          this.openSnackBar("Quotation Added Successfully");
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
    if(detailToUpdate.isDefault === 'Yes'){
      detailToUpdate.isDefault = true;
    }else{
      detailToUpdate.isDefault = false;
    }
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
