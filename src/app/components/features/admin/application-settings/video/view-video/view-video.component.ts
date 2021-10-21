import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Video } from 'src/app/models/video';
import { VideoService } from '../video.service';
@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.scss']
})
export class ViewVideoComponent implements OnInit {
  title: string = "Video URL View";
  form!: FormGroup;
  buttonText: string = '';
  userDetails: any;
  isUpdate: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,public dialogRef: MatDialogRef<ViewVideoComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
      videoURL: newDetail.videoURL,
      isDefault: newDetail.isDefault
    };
    return payload;
  }
  
  setFormValue(detailToUpdate: any) {
    this.form.get('videoURL')?.setValue(detailToUpdate.videoURL);
     this.form.get('isDefault')?.setValue(detailToUpdate.isDefault);
  }

}
