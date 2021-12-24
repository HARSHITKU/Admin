import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { UsersService } from '../users/users.service';
import { DeleteInnovationComponent } from './delete-innovation/delete-innovation.component';
import { InnovationService } from './innovation.service';
import { NewInnovationComponent } from './new-innovation/new-innovation.component';
import { ViewInnovationComponent } from './view-innovation/view-innovation.component';

@Component({
  selector: 'app-innovation',
  templateUrl: './innovation.component.html',
  styleUrls: ['./innovation.component.scss']
})
export class InnovationComponent implements OnInit {

  innovations: any;
  updatedInnovation: any[] | undefined;
  rowCount: number | undefined = 0;
  columnDefs: any;
  gridOptions: GridOptions;
  unclickDelete: boolean = false;
  unclickEdit: boolean = false;
  userDetail: any;

  constructor(private innovationService: InnovationService, private dialog: MatDialog, private usersService: UsersService) {
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
        maxWidth: 480,
        minWidth: 480,
        tooltipField: 'description',
      },
      {
        headerName: 'Earned',
        field: 'earnedChips',
        maxWidth: 130,
        tooltipField: 'earnedChips',
      },
      // {
      //   headerName: 'Kid Name',
      //   field: 'kidName',
      //   maxWidth: 200,
      //   tooltipField: 'kidName',
      // },
      // {
      //   headerName: 'Kid Age',
      //   field: 'age',
      //   maxWidth: 130,
      //   tooltipField: 'age',
      // },
      {
        headerName: 'Verified?',
        field: 'isVerified',
        maxWidth: 120,
        tooltipField: 'isVerified',
        cellRenderer: function (e: any) {
          if(e.value === 'true'){
            return 'Yes'
          }else {
            return 'No'
          }
        }
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
    this.getInnovations();
  }

  getInnovations() {
    this.innovationService.getInnovationListData().subscribe((response) => {
      if (response) {
        this.innovations = response.data;
        this.rowCount = this.innovations?.length;
        this.updatedInnovation = this.innovations?.map((innovation: any) => {
          return {
            name: `${innovation.name}`,
            earnedChips: `${innovation.earnedChips}`,
            isVerified: `${innovation.isVerified}`,
            userId: `${innovation.userId}`,
            image: `${innovation.coverImage}`,
            description: `${innovation.description}`,
            // age: `${innovation.age}`,
            // kidName: `${innovation.kidName}`,
            id: `${innovation._id}`,
          };
        });
      }
    });
  }

  getRowsDataToView(event: any){
    this.dialog.open(ViewInnovationComponent, {
      data: event,
      width: '70vw'
    });
  }

  getDeletedRowData(event: any){
    const deleteDataDialogue = this.dialog.open(DeleteInnovationComponent, {
      width: '30vw',
      data: event
    });
    deleteDataDialogue.afterClosed().subscribe((response) => {
      if(response?.status === 'success'){
        this.getInnovations();
      }else{
        return
      }
      this.unclickDelete = false;
    });
  }

  getRowsDataToBeEdited(event: any){
    const updateDataDialogue = this.dialog.open(NewInnovationComponent, {
      data: event,
      panelClass: 'panelStyle',
    });
    updateDataDialogue?.afterClosed().subscribe((response) => {
      if(response?.status === 'success'){
        this.getInnovations();
      }else{
        return
      }
      this.unclickEdit = false;
    });
  }

  getAddButtonStatus(event: boolean){
    if(event){
      const addDataDialogue = this.dialog.open(NewInnovationComponent, {
        data: event,
        panelClass: 'panelStyle',
      });
      addDataDialogue.afterClosed().subscribe((response) => {
        if(response?.status === 'success'){
          this.getInnovations();
        }else{
          return
        }
      });
    }
  }

}
