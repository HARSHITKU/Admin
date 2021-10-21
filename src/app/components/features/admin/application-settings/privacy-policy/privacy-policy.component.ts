import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { PrivacypolicyService } from './privacypolicy.service';
import { NewPrivacyPolicyComponent } from './new-privacy-policy/new-privacy-policy.component';
import { ViewPrivacyPolicyComponent } from './view-privacy-policy/view-privacy-policy.component';
import { DeletePrivacyPolicyComponent } from './delete-privacy-policy/delete-privacy-policy.component';
import { privacyPolicy } from 'src/app/models/privacypolicy';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
  privacypolicyList: any[] | undefined;
  columnDefs: any;
  gridOptions: GridOptions;
  unclickEdit: boolean = false;
  unclickDelete: boolean = false;

  constructor(
    private privacyPolicyService: PrivacypolicyService,
    private dialog: MatDialog
  ) {
    this.columnDefs = [
      {
        headerName: 'privacyPolicy',
        field: 'privacyPolicy',
        maxWidth: 900,
        minWidth: 900,
        tooltipField: 'privacyPolicy',
        default: 'privacypolicy',
      },
      {
        headerName: 'Default',
        field: 'isDefault',
        maxWidth: 200,
        tooltipField: 'isDefault',
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
    this.getAllprivacyPolicy();
  }

  getAllprivacyPolicy() {
    this.privacyPolicyService.getAllprivacyPolicy().subscribe((response) => {
      if (response) {
        this.privacypolicyList = response.data;
        this.privacypolicyList = this.privacypolicyList?.map(privacyPolicy=>{
          return {
            id: `${privacyPolicy._id}`,
            privacyPolicy : `${privacyPolicy.privacyPolicy}`,
            isDefault:privacyPolicy.isDefault? 'Yes' : 'No'
          }
        })
      }
    });
  }

  getRowsDataToView(event: any) {
    this.dialog.open(ViewPrivacyPolicyComponent, {
      data: event,
    });
  }

  getDeletedRowData(event: any) {
    const deleteDataDialogue = this.dialog.open(DeletePrivacyPolicyComponent, {
      data: event,
    });
    deleteDataDialogue.afterClosed().subscribe((response) => {
      if (response?.status === 'success') {
        this.getAllprivacyPolicy();
      } else {
        return;
      }
      this.unclickDelete = false;
    });
  }

  getRowsDataToBeEdited(event: any) {
    const updateDataDialogue = this.dialog.open(NewPrivacyPolicyComponent, {
      height: 'auto',
      data: event,
      panelClass: 'panelStyle',
    });
    updateDataDialogue?.afterClosed().subscribe((response) => {
      if (response?.status === 'success') {
        this.getAllprivacyPolicy();
      } else {
        return;
      }
      this.unclickEdit = false;
    });
  }

  getAddButtonStatus(event: boolean) {
    if (event) {
      const addDataDialogue = this.dialog.open(NewPrivacyPolicyComponent, {
        height: 'auto',
        data: event,
        panelClass: 'panelStyle',
      });
      addDataDialogue.afterClosed().subscribe((response) => {
        if (response?.status === 'success') {
          this.getAllprivacyPolicy();
        } else {
          return;
        }
      });
    }
  }
}
