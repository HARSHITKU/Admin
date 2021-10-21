import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-update-order-status',
  templateUrl: './update-order-status.component.html',
  styleUrls: ['./update-order-status.component.scss']
})
export class UpdateOrderStatusComponent implements OnInit {

  orderForm!: FormGroup;
  title: string = '';
  buttonText: string = '';
  isLoading: boolean = false;
  orderDetails: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  allStatus: any[] = [
    {
      id: 1,
      name: 'placed',
      displayName: 'Placed'
    },
    {
      id: 2,
      name: 'picked',
      displayName: 'Picked'
    },
    {
      id: 3,
      name: 'cancelled',
      displayName: 'Cancelled'
    },
    {
      id: 4,
      name: 'returned',
      displayName: 'Returned'
    },
    {
      id: 5,
      name: 'delivered',
      displayName: 'Delivered'
    },
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateOrderStatusComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ordersService: OrdersService
  ) {
    this.orderForm = this.fb.group({
      status: ['', Validators.required],
    });

    if (this.data.hasOwnProperty('id')) {
      this.title = 'Update Order Status';
      this.buttonText = 'Update';
      this.orderDetails = this.data;
      this.setFormValue(this.data);
    }
  }

  ngOnInit(): void {
  }

  closeDialog(message: string) {
    this.dialogRef.close(message);
  }

  updateOrderStatus(updatedOrderStatus: any) {
    this.isLoading = true;
    if (this.title === 'Update Order Status') {
      this.ordersService
      .updateOrderStatus(updatedOrderStatus, this.data.id)
      .subscribe((response) => {
        if (response) {
          this.isLoading = false;
          this.openSnackBar("Order Status Updated Successfully");
          this.closeDialog(response);
        }
      }, error => {
        this.openSnackBar(error.error.message);
      });
    }
  }

  setFormValue(orderDetail: any) {
    this.orderForm.get('status')?.setValue(orderDetail.status);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

}
