import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CharityService } from '../charity.service';

@Component({
  selector: 'app-delete-charity',
  templateUrl: './delete-charity.component.html',
  styleUrls: ['./delete-charity.component.scss']
})
export class DeleteChairtyComponent implements OnInit {

  charityId: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialogRef: MatDialogRef<DeleteChairtyComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _snackBar: MatSnackBar,
    private ChairtyService: CharityService) { }

  ngOnInit(): void {
    this.charityId = this.data.id;
  }

  closeDialog(message: string){
    this.dialogRef.close(message);
  }

  deleteCharity(){
    this.ChairtyService.deleteCharity(this.charityId).subscribe(response =>{
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
