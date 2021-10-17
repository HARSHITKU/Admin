import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { Support } from 'src/app/models/support';
import { SupportService } from './support.service';
import { ViewSupportComponent } from './view-support/view-support.component';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  supportsList: Support[] | undefined;
  updatedSupportsList: any;
  columnDefs: any;
  gridOptions: GridOptions;

  constructor(private service: SupportService, private dialog: MatDialog) {

    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'name',
        maxWidth: 400,
        tooltipField: 'name',
      },
      {
        headerName: 'Phone',
        field: 'phone',
        maxWidth: 150,
        tooltipField: 'phone',
      },
      {
        headerName: 'Email',
        field: 'email',
        maxWidth: 600,
        tooltipField: 'email',
      },
      {
        headerName: 'Enquiry',
        field: 'enquiry',
        minWidth: 700,
        maxWidth: 700,
        tooltipField: 'enquiry',
      }
    ];
    this.gridOptions = <GridOptions>{
      headerHeight: window.innerWidth <= 1024 ? 88 : 30,
    };
  }

  ngOnInit(): void {
    this.getAllSupportRequest();
  }

  getAllSupportRequest() {
    this.service.getAllSupportRequest().subscribe((response) => {
      if (response) {
        this.supportsList = response.data;
        this.updatedSupportsList = this.supportsList?.map(enquiry => {
          return {
            name: `${enquiry.firstName} ${enquiry.lastName}`,
            firstName: enquiry.firstName,
            lastName: enquiry.lastName,
            email: `${enquiry.email}`,
            phone: `${enquiry.phone}`,
            enquiry: `${enquiry.enquiry}`
          }
        })
      }
    });
  }

  getRowsDataToView(event: any){
    this.dialog.open(ViewSupportComponent, {
      data: event
    });
  }

}
