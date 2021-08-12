import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    SharedComponent,
    TopNavigationComponent,
    SideNavigationComponent,
    DataTableComponent,
  ],
  imports: [CommonModule, MatIconModule, MatSidenavModule, MatListModule],
  exports: [
    TopNavigationComponent,
    SideNavigationComponent,
    DataTableComponent,
  ],
})
export class SharedModule {}
