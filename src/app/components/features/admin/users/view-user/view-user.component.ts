import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUSerComponent implements OnInit {

  title: string = "View";
  userDetails: any;

  constructor(public dialogRef: MatDialogRef<ViewUSerComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
     }

  ngOnInit(): void {
    this.userDetails = this.data;
  }

  closeIconClicked(){
    this.dialogRef.close(0);
  }
  
  convertDate(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

}
