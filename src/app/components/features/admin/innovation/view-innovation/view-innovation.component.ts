import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../../users/users.service';


@Component({
  selector: 'app-view-innovation',
  templateUrl: './view-innovation.component.html',
  styleUrls: ['./view-innovation.component.scss']
})

export class ViewInnovationComponent implements OnInit {

  title: string = "View";
  innovationDetails: any;
  userDetails: any;
  isUser: boolean = false;

  constructor(private usersService: UsersService, public dialogRef: MatDialogRef<ViewInnovationComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit(): void {
    this.usersService.getUser(this.data.userId).subscribe(res => {
     this.userDetails = res.data
     this.isUser = true;
    })
    this.innovationDetails = this.data;
    
  }

  closeIconClicked(){
    this.dialogRef.close(0);
    this.isUser = false;
  }

}
