import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-delete-products',
  templateUrl: './delete-products.component.html',
  styleUrls: ['./delete-products.component.scss']
})
export class DeleteProductsComponent implements OnInit {
  id: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialogRef: MatDialogRef<DeleteProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private service: ProductsService
  ) { }

  ngOnInit(): void {
    this.id = this.data.id;

  }
  closeDialog(message: string) {
    this.dialogRef.close(message);
  }
  deleteUser() {
    this.service.deleteProducts(this.id).subscribe(response => {
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
