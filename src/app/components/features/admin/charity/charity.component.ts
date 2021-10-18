import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { Charity } from 'src/app/models/charity';
import { DeleteChairtyComponent } from './delete-charity/delete-charity.component';
import { NewCharityComponent } from './new-charity/new-charity.component';
import { CharityService } from './charity.service';
import { ViewCharityComponent } from './view-charity/view-charity.component';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-charity',
  templateUrl: './charity.component.html',
  styleUrls: ['./charity.component.scss'],
})
export class ChairtyComponent implements OnInit {
  charities: Charity[] | undefined;
  updatedcharity: any[] | undefined;
  columnDefs: any;
  gridOptions: GridOptions;
  unclickDelete: boolean = false;
  unclickEdit: boolean = false;
  userDetail: any;

  constructor(private charityService: CharityService, private dialog: MatDialog, private usersService: UsersService) {
    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'name',
        maxWidth: 200,
        tooltipField: 'name',
      },
      {
        headerName: 'Description',
        field: 'description',
        maxWidth: 450,
        minWidth: 450,
        tooltipField: 'description',
      },
      {
        headerName: 'Earned',
        field: 'earnedChips',
        maxWidth: 130,
        tooltipField: 'earnedChips',
      },
      {
        headerName: 'Status',
        field: 'status',
        maxWidth: 200,
        tooltipField: 'status',
      },
      {
        headerName: 'Verified?',
        field: 'isVerified',
        maxWidth: 120,
        tooltipField: 'isVerified',
      },
      {
        headerName: '',
        field: 'view',
        cellRenderer: function () {
          return ' <i class="fa fa-eye" aria-hidden="true"></i>';
        },
        maxWidth: 50,
      },
      {
        headerName: '',
        field: 'edit',
        cellRenderer: function () {
          return ' <i class="fa fa-edit" aria-hidden="true"></i>';
        },
        maxWidth: 50,
      },
      {
        headerName: '',
        field: 'delete',
        cellRenderer: function () {
          return '<i class="fa fa-trash" aria-hidden="true"></i>';
        },
        maxWidth: 50,
      },
    ];
    this.gridOptions = <GridOptions>{
      headerHeight: window.innerWidth <= 1024 ? 88 : 30,
    };
  }

  ngOnInit(): void {
    this.getCharities();
  }

  getCharities() {
    this.charityService.getCharityListData().subscribe((response) => {
      if (response) {
        this.charities = response.data;
        console.log(this.charities)
        this.updatedcharity = this.charities?.map((charity) => {
          return {
            name: `${charity.name}`,
            earnedChips: `${charity.earnedChips}`,
            isVerified: `${charity.isVerified}`,
            userId: `${charity.userId}`,
            coverImage: `${charity.coverImage}`,
            description: `${charity.description}`,
            status: `${charity.status}`,
          };
        });
      }
    });
  }

  getRowsDataToView(event: any){
    const viewDataDialogue = this.dialog.open(ViewCharityComponent, {
      data: event,
      width: '70vw'
    });
    viewDataDialogue.afterClosed().subscribe((response) => {
      console.log('virw compo pop up closed');
    });
    console.log(event)
  }

  getDeletedRowData(event: any){
    const deleteDataDialogue = this.dialog.open(DeleteChairtyComponent, {
      width: '30vw',
      data: event
    });
    deleteDataDialogue.afterClosed().subscribe((response) => {
      if(response?.status === 'success'){
        this.getCharities();
      }else{
        return
      }
      this.unclickDelete = false;
    });
  }

  getRowsDataToBeEdited(event: any){
    const updateDataDialogue = this.dialog.open(NewCharityComponent, {
      data: event,
      panelClass: 'panelStyle',
    });
    updateDataDialogue?.afterClosed().subscribe((response) => {
      if(response?.status === 'success'){
        this.getCharities();
      }else{
        return
      }
      this.unclickEdit = false;
    });
  }

  getAddButtonStatus(event: boolean){
    if(event){
      const addDataDialogue = this.dialog.open(NewCharityComponent, {
        data: event,
        panelClass: 'panelStyle',
      });
      addDataDialogue.afterClosed().subscribe((response) => {
        if(response?.status === 'success'){
          this.getCharities();
        }else{
          return
        }
      });
    }
  }
}
