import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PrivacypolicyService } from '../privacypolicy.service';

@Component({
  selector: 'app-delete-privacy-policy',
  templateUrl: './delete-privacy-policy.component.html',
  styleUrls: ['./delete-privacy-policy.component.scss']
})
export class DeletePrivacyPolicyComponent implements OnInit {

  id: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialogRef: MatDialogRef<DeletePrivacyPolicyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private service: PrivacypolicyService) { }

  ngOnInit(): void {
    this.id = this.data.id;
  }
  closeDialog (message: string) {
    this.dialogRef.close(message);
  }

  deleteUser() {
    this.service.deleteprivacyPolicy(this.id).subscribe(response =>{
      if(response){
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
