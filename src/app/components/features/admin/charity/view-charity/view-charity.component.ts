import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-view-charity',
  templateUrl: './view-charity.component.html',
  styleUrls: ['./view-charity.component.scss']
})
export class ViewCharityComponent implements OnInit {

  title: string = "View";
  charityDetails: any;

  constructor(public dialogRef: MatDialogRef<ViewCharityComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
     }

  ngOnInit(): void {
    this.charityDetails = this.data;
  }

  closeIconClicked(){
    this.dialogRef.close(0);
  }

}
