import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { UpdateOrderStatusComponent } from './update-order-status/update-order-status.component';
import { DeleteOrderComponent } from './delete-order/delete-order.component';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    OrdersComponent,
    ViewOrderComponent,
    UpdateOrderStatusComponent,
    DeleteOrderComponent
  ],
  exports: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrdersModule { }
