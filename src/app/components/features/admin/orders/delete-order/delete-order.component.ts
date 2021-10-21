import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.scss']
})
export class DeleteOrderComponent implements OnInit {

  orderId: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialogRef: MatDialogRef<DeleteOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _snackBar: MatSnackBar,
    private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.orderId = this.data.id;
  }

  closeDialog(message: string){
    this.dialogRef.close(message);
  }

  deleteOrder(){
    this.ordersService.deleteOrder(this.orderId).subscribe(response =>{
      if(response){
        this.openSnackBar("Order Deleted Successfully");
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
