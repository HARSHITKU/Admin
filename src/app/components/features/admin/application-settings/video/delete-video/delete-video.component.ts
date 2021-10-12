import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-delete-video',
  templateUrl: './delete-video.component.html',
  styleUrls: ['./delete-video.component.scss']
})
export class DeleteVideoComponent implements OnInit {
  id: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(public dialogRef: MatDialogRef<DeleteVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _snackBar: MatSnackBar,
    private service: VideoService) { }

    

    ngOnInit(): void {
    this.id = this.data._id;
    }
    closeDialog(message: string){
      this.dialogRef.close(message);
    }
    deleteUser(){
      this.service.deleteAbout(this.id).subscribe(response =>{
        if(response){
          this.openSnackBar(response.message);
          this.closeDialog(response);
        }
      })
    }
    openSnackBar(message: string) {
      this._snackBar.open(message, '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000
      });
    }
}
