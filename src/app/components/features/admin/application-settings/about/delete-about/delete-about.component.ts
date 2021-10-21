import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AboutService } from '../about.service';

@Component({
  selector: 'app-delete-about',
  templateUrl: './delete-about.component.html',
  styleUrls: ['./delete-about.component.scss']
})
export class DeleteAboutComponent implements OnInit {

  id: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialogRef: MatDialogRef<DeleteAboutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private service: AboutService) { }

  ngOnInit(): void {
    this.id = this.data.id;
  }

  closeDialog(message: string) {
    this.dialogRef.close(message);
  }

  deleteUser() {
    this.service.deleteAbout(this.id).subscribe(response => {
      if (response) {
        this.openSnackBar(response.message);
        this.closeDialog(response);
      }
    }, error => {
      this.openSnackBar(error.error.message);
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
