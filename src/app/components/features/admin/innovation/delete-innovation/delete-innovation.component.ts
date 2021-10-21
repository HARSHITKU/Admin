import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { InnovationService } from '../innovation.service';

@Component({
  selector: 'app-delete-innovation',
  templateUrl: './delete-innovation.component.html',
  styleUrls: ['./delete-innovation.component.scss']
})
export class DeleteInnovationComponent implements OnInit {

  charityId: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialogRef: MatDialogRef<DeleteInnovationComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _snackBar: MatSnackBar,
    private InnovationService: InnovationService) { }

  ngOnInit(): void {
    this.charityId = this.data.userId;
  }

  closeDialog(message: string){
    this.dialogRef.close(message);
  }

  deleteInnovation(){
    this.InnovationService.deleteInnovation(this.data.id).subscribe(response =>{
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
