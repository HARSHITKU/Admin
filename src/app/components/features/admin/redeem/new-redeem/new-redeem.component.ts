import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Redeem } from 'src/app/models/redeem';
import { RedeemService } from '../redeem.service';
import { CategoryService } from '../../category/category.service';
@Component({
  selector: 'app-new-redeem',
  templateUrl: './new-redeem.component.html',
  styleUrls: ['./new-redeem.component.scss'],
})
export class NewRedeemComponent implements OnInit {
  userForm!: FormGroup;
  title: string = '';
  buttonText: string = '';
  isLoading: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  categories: any;
  file: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewRedeemComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: RedeemService,
    private categoryService: CategoryService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
    });
    if (this.data.hasOwnProperty('_id')) {
      this.title = 'Update Existing Product';
      this.buttonText = 'Update Product';
      this.setFormValue(this.data);
    } else {
      this.title = 'Add New Product';
      this.buttonText = 'Add Product';
    }
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }

  closeDialog(message: string) {
    this.dialogRef.close(message);
  }
  closeModal() {
    this.dialogRef.close();
  }

  readFile(fileEvent: any) {
    this.file = fileEvent.target.files[0];
  }

  addUpdateDetails(RedeemDetails: Redeem) {
    this.isLoading = true;
    let newData = this.generatePayload(RedeemDetails);
    const formData = new FormData();
    formData.append('image', this.file);
    formData.append('name', newData.name);
    formData.append('description', newData.description);
    formData.append('price', newData.price);
    formData.append('quantity', newData.quantity);
    formData.append('categoryId', newData.category);
    if (this.title === 'Update Existing Product') {
      this.service.updateRedeem(formData, this.data._id).subscribe(
        (response) => {
          if (response) {
            this.isLoading = false;
            this.openSnackBar('Data Updated Successfully');
            this.closeDialog(response);
          }
        },
        (error) => {
          this.isLoading = false;
          this.openSnackBar(error.error.message);
        }
      );
    } else {
      this.service.addRedeem(formData).subscribe(
        (response) => {
          if (response) {
            this.isLoading = false;
            this.openSnackBar('Data Added Successfully');
            this.closeDialog(response);
          }
        },
        (error) => {
          this.isLoading = false;
          this.openSnackBar(error.error.message);
        }
      );
    }
  }
  generatePayload(RedeemDetails: any) {
    let redeem = {
      name: RedeemDetails.name,
      description: RedeemDetails.description,
      price: RedeemDetails.price,
      quantity: RedeemDetails.quantity,
      category: RedeemDetails.category,
    };
    return redeem;
  }

  setFormValue(RedeemDetails: any) {
    this.userForm.get('name')?.setValue(RedeemDetails.name);
    this.userForm.get('description')?.setValue(RedeemDetails.description);
    this.userForm.get('price')?.setValue(RedeemDetails.price);
    this.userForm.get('quantity')?.setValue(RedeemDetails.quantity);
    this.userForm.get('category')?.setValue(RedeemDetails.category);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
