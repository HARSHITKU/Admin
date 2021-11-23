import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  categoryForm!: FormGroup;
  title: string = '';
  buttonText: string = '';
  isLoading: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewCategoryComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService
  ) { 
    this.categoryForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    if (this.data.hasOwnProperty('id')) {
      this.title = 'Update Existing Category';
      this.buttonText = 'Update';
      this.setFormValue(this.data);
    } else {  
      this.title = 'Add New Category';
      this.buttonText = 'Add';
    }

   }

   get f(){
    return this.categoryForm.controls;
  }

  ngOnInit(): void {
  }

  closeDialog(message: string) {
    this.dialogRef.close(message);
  }
  closeModal() {
    this.dialogRef.close();
  }


  addUpdatecategoryDetails(categoryDetails: any) {
    this.isLoading = true;
    let categoryNewDetails = this.generatePayload(categoryDetails);
    if (this.title === 'Update Existing Category') {
      this.categoryService
      .updateCategory(categoryNewDetails, this.data.id)
      .subscribe((response) => {
        if (response) {
          this.isLoading = false;
          this.openSnackBar('Category Updated Successfully');
          this.closeDialog(response);
        }
      }, error => {
        this.isLoading = false
        this.openSnackBar(error.error.message);
      })
    } else {
      this.categoryService.addCategory(categoryDetails).subscribe((response) => {
        if (response) {
          this.isLoading = false;
          this.openSnackBar('Category Added Successfully');
          this.closeDialog(response);
        }else {
          this.isLoading = false;
        }
      },  error => {
        this.isLoading = false
        this.openSnackBar(error.error.message);
      });
    }
  }


  generatePayload(categoryDetails: any) {
    let category = {
      title: categoryDetails.title,
      description: categoryDetails.description,
    };
    return category;
  }

  setFormValue(categoryDetails: any) {
    this.categoryForm.get('title')?.setValue(categoryDetails.title);
    this.categoryForm.get('description')?.setValue(categoryDetails.description);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

}
