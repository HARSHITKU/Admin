import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { CategoryService } from '../category/category.service';
import { DeleteOrderComponent } from './delete-order/delete-order.component';
import { OrdersService } from './orders.service';
import { UpdateOrderStatusComponent } from './update-order-status/update-order-status.component';
import { ViewOrderComponent } from './view-order/view-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  ordersList: any[] | undefined;
  updatedOrders: any[] | undefined;
  categories: any[] | undefined;
  category: any;
  columnDefs: any;
  gridOptions: GridOptions;
  rowCount: number | undefined = 0;
  unclickDelete: boolean = false;
  unclickEdit: boolean = false;

  constructor(
    private orderService: OrdersService,
    private categoryService: CategoryService,
    private dialog: MatDialog
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
        headerName: 'Product Image',
        field: 'productImage',
        maxWidth: 130,
        cellRenderer: function (param: any) {
          return `<img src="${param.value}" alt="Default.img" width="20">`;
        },
      },
      {
        headerName: 'Product Name',
        field: 'productName',
        minWidth: 150,
        tooltipField: 'productName',
      },
      {
        headerName: 'Product Description',
        field: 'productDescription',
        minWidth: 150,
        tooltipField: 'productDescription',
      },
      {
        headerName: 'Product Category',
        field: 'productCategory',
        minWidth: 150,
        tooltipField: 'productCategory',
      },
      {
        headerName: 'Chips',
        field: 'amount',
        width: 80,
        tooltipField: 'amount',
      },
      {
        headerName: 'Quantity',
        field: 'quantity',
        width: 100,
        tooltipField: 'quantity',
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 100,
        tooltipField: 'status',
      },
      {
        headerName: 'Order Date',
        field: 'time',
        minWidth: 20,
        tooltipField: 'time',
      },
      {
        headerName: 'Customer Name',
        field: 'userName',
        minWidth: 120,
        tooltipField: 'userName',
      },
      {
        headerName: 'Customer Email',
        field: 'userEmail',
        minWidth: 150,
        tooltipField: 'userEmail',
      },
      {
        headerName: 'Customer Contact No.',
        field: 'contact',
        minWidth: 150,
        tooltipField: 'contact',
      },
      {
        headerName: 'Customer Address',
        field: 'fullAddress',
        minWidth: 150,
        tooltipField: 'fullAddress',
      },
    ];
    this.gridOptions = <GridOptions>{
      headerHeight: window.innerWidth <= 1024 ? 88 : 30,
    };
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((response) => {
      this.categories = response.data;
      this.getAllOrders();
    });
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe((response) => {
      if (response) {
        this.ordersList = response.data;
        this.rowCount = this.ordersList?.length;
        this.updatedOrders = this.ordersList?.map((order) => {
          this.category = this.categories?.filter(
            (category) => category._id === order.productId.categoryId
          );
       
          return {
            id: `${order._id}`,
            amount: `${order.amount}`,
            contact: `${order.customerContactNumber}`,
            productImage: `${order.productId?.imageCover}`,
            productName: `${order.productId?.name}`,
            productDescription: `${order.productId.description}`,
            productCategory: this.category[0]?.title,
            quantity: `${order.quantity}`,
            status: `${order.status}`,
            time: `${new Date(order.createdAt).getDate()}/${new Date(order.createdAt).getMonth()}/${new Date(order.createdAt).getFullYear()}`,
            userName: `${order.userId.firstName} ${order.userId.lastName}`,
            userEmail: `${order.userId.email}`,
            fullAddress: `${order.address?.address} ${order.address?.landmark}, ${order.address?.city} - ${order.address?.pinCode}, ${order.address?.state}, ${order.address?.country}`,
            address: `${order.address?.address}`,
            landmark: `${order.address?.landmark}`,
            city: `${order.address?.city}`,
            pinCode: `${order.address?.pinCode}`,
            state: `${order.address?.state}`,
            country: `${order.address?.country}`
          };
        });
      }
    });
  }

  getRowsDataToView(event: any) {
    this.dialog.open(ViewOrderComponent, {
      data: event,
    });
  }

  getDeletedRowData(event: any) {
    const deleteDataDialogue = this.dialog.open(DeleteOrderComponent, {
      data: event,
    });
    deleteDataDialogue.afterClosed().subscribe((response) => {
      if (response?.status === 'success') {
        this.getAllOrders();
      } else {
        return;
      }
      this.unclickDelete = false;
    });
  }

  getRowsDataToBeEdited(event: any) {
    const updateDataDialogue = this.dialog.open(UpdateOrderStatusComponent, {
      data: event,
      panelClass: 'panelStyle',
    });
    updateDataDialogue?.afterClosed().subscribe((response) => {
      if (response?.status === 'success') {
        this.getAllOrders();
      } else {
        return;
      }
      this.unclickEdit = false;
    });
  }

  getAddButtonStatus(event: boolean) {
    if (event) {
      const addDataDialogue = this.dialog.open(UpdateOrderStatusComponent, {
        height: 'products',
        data: event,
        panelClass: 'panelStyle',
      });
      addDataDialogue.afterClosed().subscribe((response) => {
        if (response?.status === 'success') {
          this.getAllOrders();
        } else {
          return;
        }
      });
    }
  }
}
