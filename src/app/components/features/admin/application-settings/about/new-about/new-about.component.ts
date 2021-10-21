import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { About } from 'src/app/models/about';
import { AboutService } from '../about.service';

@Component({
  selector: 'app-new-about',
  templateUrl: './new-about.component.html',
  styleUrls: ['./new-about.component.scss']
})
export class NewAboutComponent implements OnInit {

  form!: FormGroup;
  title: string = '';
  buttonText: string = '';
  isUpdate: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewAboutComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: AboutService
  ) {
    this.form = this.fb.group({
      about: ['', Validators.required],
      isDefault: [false, Validators.required]
    });
    if (this.data.hasOwnProperty('_id')) {
      this.title = 'Update About';
      this.buttonText = 'Update';
      this.setFormValue(this.data);
      this.isUpdate = true;
    } else {  
      this.title = 'Add New About';
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

  addUpdateDetails(data: About) {
    let newData = this.generatePayload(data);
    if (this.title === 'Update About') {
      this.service
        .updateAbout(newData, this.data._id)
        .subscribe((response) => {
          if (response) {
            this.openSnackBar("About Updated Successfully");
            this.closeDialog(response);
          }
        },  error => {
          this.openSnackBar(error.error.message);
        });
    } else {
      this.service.addAbout(newData).subscribe((response) => {
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
      about: newDetail.about,
      isDefault: newDetail.isDefault
    };
    return payload;
  }

  setFormValue(detailToUpdate: any) {
    this.form.get('about')?.setValue(detailToUpdate.about);
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
