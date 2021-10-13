import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TermsCoditionService } from '../terms-codition.service';

@Component({
  selector: 'app-delete-terms-conditions',
  templateUrl: './delete-terms-conditions.component.html',
  styleUrls: ['./delete-terms-conditions.component.scss']
})
export class DeleteTermsConditionsComponent implements OnInit {
  
  id: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialogRef: MatDialogRef<DeleteTermsConditionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _snackBar: MatSnackBar,
    private service: TermsCoditionService) { }
  ngOnInit(): void {
    this.id = this.data._id;
  }
  closeDialog(message: string){
    this.dialogRef.close(message);
  }
  deleteUser(){
    this.service.deleteTerms(this.id).subscribe(response =>{
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
