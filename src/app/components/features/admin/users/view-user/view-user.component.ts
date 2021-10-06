import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUSerComponent implements OnInit {

  title: string = "View";
  userDetails: User | undefined;

  constructor(public dialogRef: MatDialogRef<ViewUSerComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
     }

  ngOnInit(): void {
    console.log("ViewUSerComponent" , this.data)
    this.userDetails = this.data;
  }

  closeIconClicked(){
    this.dialogRef.close(0);
  }
}
