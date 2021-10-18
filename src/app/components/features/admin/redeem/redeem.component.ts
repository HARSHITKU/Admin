import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { Redeem } from 'src/app/models/redeem';
import { RedeemService } from './redeem.service';
import { NewRedeemComponent } from './new-redeem/new-redeem.component';
import { ViewRedeemComponent } from './view-redeem/view-redeem.component';
import { DeleteRedeemComponent } from './delete-redeem/delete-redeem.component';
@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {
  redeemList: Redeem[] | undefined;
  UpdatedRedeem: any[] | undefined;
  columnDefs: any;
  gridOptions: GridOptions;
  unclickDelete: boolean = false;
  unclickEdit: boolean = false;
  constructor(private redeemService: RedeemService, private dialog: MatDialog) {

    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'name',
        minWidth: 150,
        tooltipField: 'name',
      },
      {
        headerName: 'Description',
        field: 'description',
        minWidth: 350,
        tooltipField: 'description',
      },
      {
        headerName: 'Price',
        field: 'price',
        minWidth: 20,
        tooltipField: 'price',
      },
      {
        headerName: 'Quantity',
        field: 'quantity',
        minWidth: 10,
        tooltipField: 'quantity',
      },
      {
        headerName: 'Category',
        field: 'categoryId',
        minWidth: 10,
        tooltipField: 'categoryId',
      },
      {
        field: 'edit',
        cellRenderer: function () {
          return ' <i class="fa fa-edit" aria-hidden="true"></i>';
        },
        minWidth: 10,
      },
      {
        field: 'delete',
        cellRenderer: function () {
          return '<i class="fa fa-trash" aria-hidden="true"></i>';
        },
        minWidth: 10,
      },
    ];
    this.gridOptions = <GridOptions>{
      headerHeight: window.innerWidth <= 1024 ? 88 : 30,
    };
  }

  ngOnInit(): void {
    this.getAllRedeem();
  }

  getAllRedeem() {
    this.redeemService.getAllRedeem().subscribe((response) => {
      if (response) {
        this.redeemList = response.data;
        this.UpdatedRedeem = this.redeemList?.map((products)=>{
          return {
            name: `${products}`,
            description: `${products.description}`
          }
        })
      }
    });
  }

  getRowsDataToView(event: any){
    this.dialog.open(ViewRedeemComponent, {
      data: event
    });
  }

  getDeletedRowData(event: any){
    const deleteDataDialogue = this.dialog.open(DeleteRedeemComponent, {
      data: event
    });
    deleteDataDialogue.afterClosed().subscribe((response) => {
      if(response?.status === 'success'){
        this.getAllRedeem();
      }else{
        return
      }
      this.unclickDelete = false;
    });
  }

  getRowsDataToBeEdited(event: any){
    const updateDataDialogue = this.dialog.open(NewRedeemComponent, {
      data: event,
      panelClass: 'panelStyle',
    });
    updateDataDialogue?.afterClosed().subscribe((response) => {
      if(response?.status === 'success'){
        this.getAllRedeem();
      }else{
        return
      }
      this.unclickEdit = false;
    });
  }

  getAddButtonStatus(event: boolean){
    if(event){
      const addDataDialogue = this.dialog.open(NewRedeemComponent, {
        height: 'products',
        data: event,
        panelClass: 'panelStyle',
      });
      addDataDialogue.afterClosed().subscribe((response) => {
        if(response?.status === 'success'){
          this.getAllRedeem();
        }else{
          return
        }
      });
    }
  }

}
