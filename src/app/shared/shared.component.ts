import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChildren,
} from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss'],
})
export class SharedComponent implements OnInit, OnChanges {
  //grid -variables
  @Input() rowData: any[] | undefined;
  @Input() columnDefs: any[];
  @Input() gridOptions: GridOptions;
  @Input() component: Component | undefined;
  @Input() isDeleteUnClicked: boolean = false;
  @Input() isAddButtonRequired: boolean = false;
  @Output() isRowClickedToViewData = new EventEmitter();
  @Output() isRowClickedToDeleteData = new EventEmitter();
  @Output() isRowClickedToEditData = new EventEmitter();
  @Output() isAddButtonClicked = new EventEmitter();
  isAsync: boolean = true;

  //pop-up variables
  deleteColumnClicked: boolean = false;
  editColumnClicked: boolean = false;

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
  @Input() rowCount: number | undefined;

  constructor() {
    this.gridOptions = <GridOptions>{};
  }

  ngOnChanges() {
    this.deleteColumnClicked = this.isDeleteUnClicked;
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
    this.isAsync = this.rowData instanceof Observable;
    this.gridOptions.paginationPageSize = 50;
    this.gridOptions.pagination = true;
  }

  onRowClicked(event: any) {
    if (
      event.type === 'rowClicked' &&
      !this.deleteColumnClicked &&
      !this.editColumnClicked
    ) {
      this.isRowClickedToViewData.emit(event.node.data);
    }
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
    this.gridOptions.api?.exportDataAsCsv();
  }

  openPopUp(event: any) {
    if (event.type === 'cellClicked' && event.column.colId === 'delete') {
      this.isRowClickedToDeleteData.emit(event.data);
      this.deleteColumnClicked = true;
    }

    if (event.type === 'cellClicked' && event.column.colId === 'edit') {
      this.isRowClickedToEditData.emit(event.data);
      this.editColumnClicked = true;
    }
    if (event.type === 'cellClicked' && event.column.colId === 'view') {
      this.isRowClickedToViewData.emit(event.data);
      this.editColumnClicked = true;
    }
  }

  openAddPopup() {
    this.isAddButtonClicked.emit(true);
  }
}
