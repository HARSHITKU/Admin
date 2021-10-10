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
        maxWidth: 200,
        tooltipField: 'name',
      },
      {
        headerName: 'Email Id',
        field: 'email',
        maxWidth: 200,
        tooltipField: 'email',
      },
      {
        headerName: 'Phone',
        field: 'phone',
        maxWidth: 130,
        tooltipField: 'phone',
      },
      {
        headerName: 'Date of Birth',
        field: 'displayDOB',
        maxWidth: 120,
        tooltipField: 'displayDOB',
      },
      {
        headerName: 'Address',
        field: 'address',
        maxWidth: 200,
        tooltipField: 'address',
      },
      {
        headerName: 'City',
        field: 'city',
        maxWidth: 120,
        tooltipField: 'city',
      },
      {
        headerName: 'State',
        field: 'state',
        maxWidth: 120,
        tooltipField: 'state',
      },
      {
        headerName: 'Country',
        field: 'country',
        maxWidth: 100,
        tooltipField: 'country',
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
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUserListData().subscribe((response) => {
      if (response) {
        this.users = response.data;
        console.log(response.data)
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
      width: '30vw',
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
