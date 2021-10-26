import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Products } from 'src/app/models/products';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  title: string = "Products Details View";
  form!: FormGroup;
  buttonText: string = '';
  userDetails: any;
  isUpdate: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(
    private fb: FormBuilder,public dialogRef: MatDialogRef<ViewProductsComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProductsService
  ) {
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
      about: newDetail.about,
      isDefault: newDetail.isDefault
    };
    return payload;
  }
  setFormValue(detailToUpdate: any) {
    this.form.get('products')?.setValue(detailToUpdate.products);
    this.form.get('isDefault')?.setValue(detailToUpdate.isDefault);
  }

}
