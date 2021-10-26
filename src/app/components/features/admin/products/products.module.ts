import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewProductsComponent } from './new-products/new-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { DeleteProductsComponent } from './delete-products/delete-products.component';


@NgModule({
  declarations: [
    ProductsComponent,
    NewProductsComponent,
    ViewProductsComponent,
    DeleteProductsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class ProductsModule { }
