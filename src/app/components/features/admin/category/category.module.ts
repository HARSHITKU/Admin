import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CategoryComponent,
    ViewCategoryComponent,
    DeleteCategoryComponent,
    NewCategoryComponent
  ],
  exports: [
    CategoryComponent,
    ViewCategoryComponent,
    DeleteCategoryComponent,
    NewCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CategoryModule { }
