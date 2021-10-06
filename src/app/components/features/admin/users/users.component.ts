import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { User } from 'src/app/models/user-data';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersService } from './users.service';
import { ViewUSerComponent } from './view-user/view-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] | undefined;
  updatedUsers: any[] | undefined;
  columnDefs: any;
  gridOptions: GridOptions;
  unclickDelete: boolean = false;
  unclickEdit: boolean = false;

  constructor(private usersService: UsersService, private dialog: MatDialog) {
    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'name',
        minWidth: 50,
        tooltipField: 'name',
      },
      {
        headerName: 'Email Id',
        field: 'email',
        minWidth: 50,
        tooltipField: 'email',
      },
      {
        headerName: 'Phone',
        field: 'phone',
        minWidth: 50,
        tooltipField: 'phone',
      },
      {
        headerName: 'Date of Birth',
        field: 'displayDOB',
        minWidth: 50,
        tooltipField: 'displayDOB',
      },
      {
        headerName: 'Address',
        field: 'address',
        minWidth: 50,
        tooltipField: 'address',
      },
      {
        headerName: 'City',
        field: 'city',
        minWidth: 50,
        tooltipField: 'city',
      },
      {
        headerName: 'State',
        field: 'state',
        minWidth: 50,
        tooltipField: 'state',
      },
      {
        headerName: 'Country',
        field: 'country',
        minWidth: 50,
        tooltipField: 'country',
      },
      {
        field: 'edit',
        cellRenderer: function () {
          return ' <i class="fa fa-edit" aria-hidden="true"></i>';
        },
        Width: 10,
      },
      {
        field: 'delete',
        cellRenderer: function () {
          return '<i class="fa fa-trash" aria-hidden="true"></i>';
        },
        minWidth: 20,
      },
    ];
    this.gridOptions = <GridOptions>{
      headerHeight: window.innerWidth <= 1024 ? 88 : 30,
    };
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUserListData().subscribe((response) => {
      if (response) {
        this.users = response.data;
        this.updatedUsers = this.users?.map((user) => {
          return {
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            email: `${user.email}`,
            phone: `${user.phone}`,
            displayDOB: `${new Date(user.dateOfBirth).getDate()}-${new Date(
              user.dateOfBirth
            ).getMonth()}-${new Date(user.dateOfBirth).getFullYear()}`,
            dateOfBirth: `${user.dateOfBirth}`,
            address: `${user.address?.landmark} ${user.address?.address}`,
            landmark: user.address?.landmark,
            pinCode: user.address?.pinCode,
            city: `${user.address?.city}`,
            state: `${user.address?.state}`,
            country: `${user.address?.country}`,
            id: `${user._id}`,
          };
        });
      }
    });
  }

  getRowsDataToView(event: any){
    const viewDataDialogue = this.dialog.open(ViewUSerComponent, {
      data: event
    });
    viewDataDialogue.afterClosed().subscribe((response) => {
      console.log('virw compo pop up closed');
    });
  }

  getDeletedRowData(event: any){
    const deleteDataDialogue = this.dialog.open(DeleteUserComponent, {
      data: event
    });
    deleteDataDialogue.afterClosed().subscribe((response) => {
      if(response?.status === 'success'){
        this.getUsers();
      }else{
        return
      }
      this.unclickDelete = false;
    });
  }

  getRowsDataToBeEdited(event: any){
    const updateDataDialogue = this.dialog.open(NewUserComponent, {
      width: '60vw',
      height: '40vw',
      data: event,
      panelClass: 'panelStyle',
    });
    updateDataDialogue?.afterClosed().subscribe((response) => {
      if(response?.status === 'success'){
        this.getUsers();
      }else{
        return
      }
      this.unclickEdit = false;
    });
  }

  getAddButtonStatus(event: boolean){
    if(event){
      const addDataDialogue = this.dialog.open(NewUserComponent, {
        width: '60vw',
        height: '40vw',
        data: event,
        panelClass: 'panelStyle',
      });
      addDataDialogue.afterClosed().subscribe((response) => {
        if(response?.status === 'success'){
          this.getUsers();
        }else{
          return
        }
      });
    }
  }
}
