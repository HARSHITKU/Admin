import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { TermsConditions } from 'src/app/models/terms-conditions';
import { TermsCoditionService } from './terms-codition.service';
import { DeleteTermsConditionsComponent } from './delete-terms-conditions/delete-terms-conditions.component';
import { ViewTermsConditionsComponent } from './view-terms-conditions/view-terms-conditions.component';
import { NewTermsConditionsComponent } from './new-terms-conditions/new-terms-conditions.component';
@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {
  TermsConditionsList: TermsConditions[] | undefined;
  columnDefs: any;
  gridOptions: GridOptions;
  unclickDelete: boolean = false;
  unclickEdit: boolean = false;

  constructor(private termsCoditionService: TermsCoditionService, private dialog: MatDialog) {
    this.columnDefs = [
      {
        headerName: 'TermsConditions',
        field: 'termsAndConditions',
        maxWidth: 900,
        minWidth: 900,
        tooltipField: 'termsAndConditions',
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
    this.getAllTerms();
  }
  getAllTerms() {
    this.termsCoditionService.getAllTerms().subscribe((response) => {
      if (response) {
        this.TermsConditionsList = response.data;
      }
    });
  }
  getRowsDataToView(event: any) {
    this.dialog.open(ViewTermsConditionsComponent, {
      data: event
    });
  }
  getDeletedRowData(event: any) {
    const deleteDataDialogue = this.dialog.open(DeleteTermsConditionsComponent, {
      data: event
    });
    deleteDataDialogue.afterClosed().subscribe((response) => {
      if (response?.status === 'success') {
        this.getAllTerms();
      } else {
        return
      }
      this.unclickDelete = false;
    });
  }
  getRowsDataToBeEdited(event: any) {
    const updateDataDialogue = this.dialog.open(NewTermsConditionsComponent, {
      data: event,
      panelClass: 'panelStyle',
    });
    updateDataDialogue?.afterClosed().subscribe((response) => {
      if (response?.status === 'success') {
        this.getAllTerms();
      } else {
        return
      }
      this.unclickEdit = false;
    });
  }
  getAddButtonStatus(event: boolean) {
    if (event) {
      const addDataDialogue = this.dialog.open(NewTermsConditionsComponent, {
        height: 'auto',
        data: event,
        panelClass: 'panelStyle',
      });
      addDataDialogue.afterClosed().subscribe((response) => {
        if (response?.status === 'success') {
          this.getAllTerms();
        } else {
          return
        }
      });
    }
  }
}
