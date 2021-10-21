import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { About } from 'src/app/models/about';
import { AboutService } from '../about.service';

@Component({
  selector: 'app-view-about',
  templateUrl: './view-about.component.html',
  styleUrls: ['./view-about.component.scss']
})
export class ViewAboutComponent implements OnInit {
  title: string = "About Details View";
  form!: FormGroup;
  buttonText: string = '';
  userDetails: any;
  isUpdate: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,public dialogRef: MatDialogRef<ViewAboutComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: AboutService
    ){
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
    this.form.get('about')?.setValue(detailToUpdate.about);
    this.form.get('isDefault')?.setValue(detailToUpdate.isDefault);
  }
}
