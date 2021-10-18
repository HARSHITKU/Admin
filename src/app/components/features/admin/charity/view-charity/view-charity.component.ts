import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../../users/users.service';


@Component({
  selector: 'app-view-charity',
  templateUrl: './view-charity.component.html',
  styleUrls: ['./view-charity.component.scss']
})

export class ViewCharityComponent implements OnInit {

  title: string = "View";
  charityDetails: any;
  userDetails: any;
  isUser: boolean = false;

  constructor(private usersService: UsersService, public dialogRef: MatDialogRef<ViewCharityComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit(): void {
    this.usersService.getUser(this.data.userId).subscribe(res => {
     this.userDetails = res.data
     this.isUser = true;
    })
    this.charityDetails = this.data;
    
  }

  closeIconClicked(){
    this.dialogRef.close(0);
    this.isUser = false;
  }

}
