import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-support',
  templateUrl: './view-support.component.html',
  styleUrls: ['./view-support.component.scss']
})
export class ViewSupportComponent implements OnInit {

  title: string = "View";
  allData: any;

  constructor(public dialogRef: MatDialogRef<ViewSupportComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
     }

  ngOnInit(): void {
    this.allData = this.data;
  }

  closeIconClicked(){
    this.dialogRef.close(0);
  }

}
