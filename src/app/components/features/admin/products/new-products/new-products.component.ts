import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import { Products } from 'src/app/models/products';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.scss']
})
export class NewProductsComponent implements OnInit {
  form!: FormGroup;
  title: string = '';
  buttonText: string = '';
  isUpdate: boolean = false;
   horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewProductsComponent>,
    private _snackBar: MatSnackBar,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private service: ProductsService,
  ) {
    this.form = this.fb.group({
      Products: ['', Validators.required],
      isDefault: [false, Validators.required],
    });
    if (this.data.hasOwnProperty('id')) {
      this.title = 'Update Products';
      this.buttonText = 'Update';
      this.setFormValue(this.data);
      this.isUpdate = true;
      } else {  
      this.title = 'Add New Product';
      this.buttonText = 'Add';
      this.isUpdate = false;
     }
   }
   get f(){
    return this.form.controls;
  }
  closeDialog(message: string) {
    this.dialogRef.close(message);
  }


  ngOnInit(): void {
  }
  addUpdateDetails(data: Products) {
    let newData = this.generatePayload(data);
    if (this.title === 'Update About') {
      this.service
        .updateProducts(newData, this.data.id)
        .subscribe((response) => {
          if (response) {
            this.openSnackBar("Products Updated Successfully");
            this.closeDialog(response);
          }
        },  error => {
          this.openSnackBar(error.error.message);
        });
    } else {
      this.service.addProducts(newData).subscribe((response) => {
        if (response) {
          this.openSnackBar("About Added Successfully");
          this.closeDialog(response);
        }
      }, error => {
        this.openSnackBar(error.error.message);
      });
    }
  }
  generatePayload(newDetail: any) {
    let payload = {
      Products: newDetail.Products,
      isDefault: newDetail.isDefault
    };
    return payload;
  }
  setFormValue(detailToUpdate: any) {
    this.form.get('products')?.setValue(detailToUpdate.about);
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
