import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryComponent } from './sub-category.component';

@NgModule({
  declarations: [
    SubCategoryComponent
  ],
  exports: [
    SubCategoryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SubCategoryModule { }
