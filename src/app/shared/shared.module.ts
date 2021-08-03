import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';

@NgModule({
  declarations: [
    SharedComponent,
    TopNavigationComponent,
    SideNavigationComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopNavigationComponent,
    SideNavigationComponent,
    DataTableComponent
  ]
})
export class SharedModule { }
