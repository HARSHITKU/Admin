import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { QuotationService } from '../quotation.service';
@Component({
  selector: 'app-delete-quotation',
  templateUrl: './delete-quotation.component.html',
  styleUrls: ['./delete-quotation.component.scss']
})
export class DeleteQuotationComponent implements OnInit {
  id: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(public dialogRef: MatDialogRef<DeleteQuotationComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _snackBar: MatSnackBar,
    private service: QuotationService) { }

  ngOnInit(): void {
    this.id = this.data._id;
  }
  closeDialog(message: string){
    this.dialogRef.close(message);
  }
  deleteUser(){
    this.service.deleteQuotation(this.id).subscribe(response =>{
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
