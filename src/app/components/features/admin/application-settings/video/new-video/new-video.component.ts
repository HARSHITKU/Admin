import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Video } from 'src/app/models/video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-new-video',
  templateUrl: './new-video.component.html',
  styleUrls: ['./new-video.component.scss']
})
export class NewVideoComponent implements OnInit {

  form!: FormGroup;
  title: string = '';
  buttonText: string = '';
  isUpdate: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewVideoComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: VideoService
  ) {
    this.form = this.fb.group({
      videoURL: ['', Validators.required],
      isDefault: [false, Validators.required]
    });
    if (this.data.hasOwnProperty('_id')) {
      this.title = 'Update Existing Video';
      this.buttonText = 'Update Video';
      this.setFormValue(this.data);
      this.isUpdate = true;
    } else {  
      this.title = 'Add New Video';
      this.buttonText = 'Add Video';
      this.isUpdate = false;
    }
   }

   ngOnInit(): void {
  }

  setFormValue(detailToUpdate: any) {
    this.form.get('videoURL')?.setValue(detailToUpdate.videoURL);
    this.form.get('isDefault')?.setValue(detailToUpdate.isDefault);
  }

  closeDialog(message: string) {
    this.dialogRef.close(message);
  }

  addUpdateDetails(data: Video) {
    let newData = this.generatePayload(data);
    if (this.title === 'Update Existing Video') {
      this.service
        .updateVideo(newData, this.data._id)
        .subscribe((response) => {
          if (response) {
            this.openSnackBar('Video Updated Successfully');
            this.closeDialog(response);
          }
        });
    } else {
      this.service.addVideo(newData).subscribe((response) => {
        if (response) {
          this.openSnackBar('Video Added Successfully');
          this.closeDialog(response);
        }
      });
    }
  }

  generatePayload(newDetail: any) {
    let payload = {
      videoURL: newDetail.videoURL,
      isDefault: newDetail.isDefault
    };
    return payload;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

}

