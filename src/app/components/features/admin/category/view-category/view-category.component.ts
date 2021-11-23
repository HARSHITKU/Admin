import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  title: string = "View";
  categoryDetails: any;

  constructor( public dialogRef: MatDialogRef<ViewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit(): void {
    this.categoryDetails = this.data;
    
  }

  closeIconClicked(){
    this.dialogRef.close(0);
  }
}
