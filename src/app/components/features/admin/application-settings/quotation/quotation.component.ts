import { Component, OnInit } from '@angular/core';
import { DialogRole, MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { Quotation } from 'src/app/models/quotation';
import { QuotationService } from './quotation.service';
import { DeleteQuotationComponent } from './delete-quotation/delete-quotation.component';
import { NewQuotationComponent } from './new-quotation/new-quotation.component';
import { ViewQuotationComponent } from './view-quotation/view-quotation.component';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {
  quotationList: any[] | undefined;
  columnDefs: any;
  rowCount: number | undefined;
  gridOptions: GridOptions;
  unclickDelete: boolean = false;
  unclickEdit: boolean = false;

  constructor(private quotationService:QuotationService, private dialog:MatDialog) {
    this.columnDefs = [
      {
        headerName: 'Quotation',
        field: 'quotation',
        minWidth: 900,
        maxWidth: 900,
        tooltipField: 'quotation',
      },
      {
        headerName: 'Default',
        field: 'isDefault',
        minWidth: 50,
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
    this.getAllQuotation();
  }
  getAllQuotation() {
    this.quotationService.getAllQuotation().subscribe((response) => {
      if (response) {
        this.quotationList = response.data;
        this.rowCount = this.quotationList?.length;
        this.quotationList = this.quotationList?.map(quotation => {
          return {
            id: `${quotation._id}`,
            quotation: `${quotation.quotation}`,
            isDefault: quotation.isDefault ? 'Yes' : 'No'
          }
        })
      }
    });
  }
  getRowsDataToView(event: any){
    this.dialog.open(ViewQuotationComponent, {
      data: event
    });
  }
  getDeletedRowData(event: any){
    const deleteDataDialogue = this.dialog.open(DeleteQuotationComponent, {
      data: event
    });
    deleteDataDialogue.afterClosed().subscribe((response) => {
      if(response?.status === 'success'){
        this.getAllQuotation();
      }else{
        return
      }
      this.unclickDelete = false;
    });
  }
  getRowsDataToBeEdited(event: any){
    const updateDataDialogue = this.dialog.open(NewQuotationComponent, {
      data: event,
      panelClass: 'panelStyle',
    });
    updateDataDialogue?.afterClosed().subscribe((response) => {
      if(response?.status === 'success'){
        this.getAllQuotation();
      }else{
        return
      }
      this.unclickEdit = false;
    });
  }
  getAddButtonStatus(event: boolean){
    if(event){
      const addDataDialogue = this.dialog.open(NewQuotationComponent, {
        height: 'auto',
        data: event,
        panelClass: 'panelStyle',
      });
      addDataDialogue.afterClosed().subscribe((response) => {
        if(response?.status === 'success'){
          this.getAllQuotation();
        }else{
          return
        }
      });
    }
  }
}
