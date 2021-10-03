import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, ViewChildren } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewComponent } from './components/view/view.component';

@Component({
  selector: 'admin-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss'],
})
export class SharedComponent implements OnInit {
  gridOptions: GridOptions;

  columnDefs = [
    { field: ' ', checkboxSelection: true, width: 50 },

    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    {
      field: 'delete',
      cellRenderer: function () {
        return '<i class="fa fa-trash" aria-hidden="true"></i>';
      },
    },
    {
      field: 'edit',
      cellRenderer: function () {
        return ' <i class="fa fa-edit" aria-hidden="true"></i>';
      },
    },
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
    { make: 'Ford', model: 'Boxter', price: 72321 },
    { make: 'SUV', model: 'Boxter', price: 723 },
    { make: 'Tata', model: 'Boxter', price: 72000 },
  ];

  // filter variables
  @ViewChildren('input') input = '';
  searchTextChanged: EventEmitter<any> = new EventEmitter();
  maxLength: number = 0;
  showTotal: boolean = false;
  filterCleared: EventEmitter<any> = new EventEmitter();
  iconFilter: boolean = false;
  searchText: any = '';
  showSelectedNoOfRows: boolean = false;
  selectedItemsCount: number = 0;
  rowCount: number | undefined;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.gridOptions = <GridOptions>{};
  }

  ngOnInit(): void {
    this.gridOptions.rowHeight = 30;
    if (this.gridOptions.api) {
      this.gridOptions.api.setColumnDefs(this.columnDefs);
      this.gridOptions.api.sizeColumnsToFit();
    }
    if (!this.gridOptions.defaultColDef) {
      this.gridOptions.defaultColDef = {};
    }
    this.gridOptions.defaultColDef.sortable = true;
    this.gridOptions.defaultColDef.resizable = true;
    this.gridOptions.enableCellTextSelection = true;
    this.gridOptions.suppressCellSelection = true;
    this.rowCount = this.rowData.length;
  }

  onRowClicked(event: any) {
    console.log('event', event.node.data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '400px';
    const viewDialog = this.dialog.open(ViewComponent, dialogConfig);
    viewDialog.afterClosed().subscribe((response) => {
      console.log('virw compo pop up closed');
    });
  }

  onSearchTextChanged(searchText: any) {
    let text = searchText.target.value;
    this.searchText = text;
    if (this.gridOptions.api) {
      this.gridOptions.api.setQuickFilter(text);
      this.searchTextChanged.emit(text);
      this.rowCount = this.gridOptions.api.getDisplayedRowCount();
    }
  }

  onClearSearchText() {
    this.searchText = '';
    if (this.gridOptions.api) {
      this.gridOptions.api.setQuickFilter('');
      this.searchTextChanged.emit('');
    }
  }

  onBtnExport() {
    // download button - issue -- check box and icon
    console.log('onBtnExport');
    this.gridOptions.api?.exportDataAsCsv();
  }
}
