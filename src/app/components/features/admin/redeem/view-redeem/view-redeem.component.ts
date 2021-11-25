import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Redeem } from 'src/app/models/redeem';
@Component({
  selector: 'app-view-redeem',
  templateUrl: './view-redeem.component.html',
  styleUrls: ['./view-redeem.component.scss']
})
export class ViewRedeemComponent implements OnInit {
  title: string = "View";
  products: any;

  constructor(public dialogRef: MatDialogRef<ViewRedeemComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.products = this.data;
    console.log(this.products)
  }
  
  closeIconClicked(){
    this.dialogRef.close(0);
  }

}
