import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { Products } from 'src/app/models/products';
import { ProductsService } from './products.service';
import { DeleteProductsComponent } from './delete-products/delete-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { NewProductsComponent } from './new-products/new-products.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  ProductsList : any[] | undefined;
  columnDefs: any;
  gridOptions: GridOptions;
  unclickDelete: boolean = false;
  unclickEdit: boolean = false;
  rowCount: number | undefined;

  constructor(private productsService: ProductsService, private dialog: MatDialog) { 
    this.columnDefs = [
      {
        headerName: 'Products',
        field: 'products',
        maxWidth: 900,
        minWidth: 900,
        tooltipField: 'products',
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
    this.getAllProducts();
  }
  getAllProducts(){
    this.productsService.getAllProducts().subscribe((response) => {
      if (response) {
        this.ProductsList = response.data;
        this.rowCount = this.ProductsList?.length;
        this.ProductsList = this.ProductsList?.map(about => {
          return {
            id: `${about._id}`,
            about: `${about.about}`,
            isDefault: about.isDefault ? 'Yes' : 'No'
          }
        })
      }
    });
  }
  
  getRowsDataToView(event: any){
    this.dialog.open(ViewProductsComponent, {
      data: event
    });
  }
  getDeletedRowData(event: any){
    const deleteDataDialogue = this.dialog.open(DeleteProductsComponent, {
      data: event
    });
    deleteDataDialogue.afterClosed().subscribe((response) => {
      if(response?.status === 'success'){
        this.getAllProducts();
      }else{
        return
      }
      this.unclickDelete = false;
    });
  }
  getRowsDataToBeEdited(event: any){
    const updateDataDialogue = this.dialog.open(NewProductsComponent, {
      data: event,
      panelClass: 'panelStyle',
    });
    updateDataDialogue?.afterClosed().subscribe((response) => {
      if(response?.status === 'success'){
        this.getAllProducts();
      }else{
        return
      }
      this.unclickEdit = false;
    });
  }
  getAddButtonStatus(event: boolean){
    if(event){
      const addDataDialogue = this.dialog.open(NewProductsComponent, {
        height: 'auto',
        data: event,
        panelClass: 'panelStyle',
      });
      addDataDialogue.afterClosed().subscribe((response) => {
        if(response?.status === 'success'){
          this.getAllProducts();
        }else{
          return
        }
      });
    }
  }

}
