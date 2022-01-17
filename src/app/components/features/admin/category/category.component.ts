import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from './category.service';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { NewCategoryComponent } from './new-category/new-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: any[] | undefined;
  updatedCategories: any[] | undefined;
  rowCount: number | undefined = 0;
  columnDefs: any;
  gridOptions: GridOptions;
  unclickDelete: boolean = false;
  unclickEdit: boolean = false;
  userDetail: any;

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) { 
    this.columnDefs = [
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
      {
        headerName: 'Title',
        field: 'title',
        maxWidth: 400,
        minWidth: 400,
        tooltipField: 'title',
      },
      {
        headerName: 'Description',
        field: 'description',
        maxWidth: 600,
        minWidth: 600,
        tooltipField: 'description',
      },
    ];
    this.gridOptions = <GridOptions>{
      headerHeight: window.innerWidth <= 1024 ? 88 : 30,
    };
   }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((response) => {
      if (response) {
        this.categories = response.data;
        this.rowCount = this.categories?.length;
        this.updatedCategories = this.categories?.map((category) => {
          return {
            title: `${category.title}`,
            description: `${category.description}`,
            id: `${category._id}`,
          };
        });
      }
    });
  }

  getRowsDataToView(event: any){
    const viewDataDialogue = this.dialog.open(ViewCategoryComponent, {
      data: event,
      width: '30vw'
    });
    viewDataDialogue.afterClosed().subscribe((response) => {
      
    });
  }

  getDeletedRowData(event: any){
    const deleteDataDialogue = this.dialog.open(DeleteCategoryComponent, {
      width: '30vw',
      data: event
    });
    deleteDataDialogue.afterClosed().subscribe((response) => {
      if(response?.status === 'success'){
        this.getCategories();
      }else{
        return
      }
      this.unclickDelete = false;
    });
  }

  getRowsDataToBeEdited(event: any){
    const updateDataDialogue = this.dialog.open(NewCategoryComponent, {
      data: event,
      panelClass: 'panelStyle',
    });
    updateDataDialogue?.afterClosed().subscribe((response) => {
      if(response?.status === 'success'){
        this.getCategories();
      }else{
        return
      }
      this.unclickEdit = false;
    });
  }

  getAddButtonStatus(event: boolean){
    if(event){
      const addDataDialogue = this.dialog.open(NewCategoryComponent, {
        data: event,
        panelClass: 'panelStyle',
      });
      addDataDialogue.afterClosed().subscribe((response) => {
        if(response?.status === 'success'){
          this.getCategories();
        }else{
          return
        }
      });
    }
  }

}
