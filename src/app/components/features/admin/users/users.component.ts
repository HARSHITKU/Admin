import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { GridOptions } from 'ag-grid-community';
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
  users: any[] | undefined;
  updatedUsers: any[] | undefined;
  columnDefs: any;
  gridOptions: GridOptions;
  unclickDelete: boolean = false;
  unclickEdit: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  rowCount: number | undefined = 0;

  constructor(private usersService: UsersService, private dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.columnDefs = [
      {
        headerName: 'Img',
        field: 'profileImage',
        maxWidth: 100,
        cellRenderer :function(param: any){
          return `<img src="${param.value}" alt="Default.img" width="20">`
        }
      },
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
        headerName: 'Blocked',
        field: 'blocked',
        maxWidth: 100,
        tooltipField: 'blocked',
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
        this.rowCount = this.users?.length;
        this.updatedUsers = this.users?.map((user) => {
          return {
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            email: `${user.email}`,
            phone: `${user.phone}`,
            displayDOB: `${new Date(user.dateOfBirth).getDate()}-${new Date(
              user.dateOfBirth
            ).getMonth() + 1}-${new Date(user.dateOfBirth).getFullYear()}`,
            dateOfBirth: `${user.dateOfBirth}`,
            address: `${user.addresses[0]?.landmark} ${user.addresses[0]?.address}`,
            landmark: user.addresses[0]?.landmark,
            pinCode: user.addresses[0]?.pinCode,
            city: `${user.addresses[0]?.city}`,
            state: `${user.addresses[0]?.state}`,
            country: `${user.addresses[0]?.country}`,
            id: `${user._id}`,
            profileImage : `${user.profileImage}`,
            blocked: user.isBlocked ? 'Yes' : 'No'
            };
        });
      }
    }, error => {
      this.openSnackBar(error.error.message);
    });
  }

  getRowsDataToView(event: any){
    const viewDataDialogue = this.dialog.open(ViewUSerComponent, {
      data: event
    });
    viewDataDialogue.afterClosed().subscribe((response) => {
      
    });
  }

  getDeletedRowData(event: any){
    const deleteDataDialogue = this.dialog.open(DeleteUserComponent, {
      width: '400px',
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

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

  convertDate(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
}
