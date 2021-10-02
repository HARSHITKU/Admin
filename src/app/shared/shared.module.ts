import { CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { DataTableModule } from './components/data-table/data-table.module';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { ViewComponent } from './components/view/view.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    SharedComponent,
    TopNavigationComponent,
    SideNavigationComponent,
    DataTableComponent,
    DataTableComponent,
    ViewComponent
  ],
  imports: [CommonModule,
      MatIconModule,
      MatSidenavModule,
      MatListModule,
      MatDialogModule,
      DataTableModule,AgGridModule.withComponents([ViewComponent]),
      HttpClientModule ],
  exports: [
    TopNavigationComponent,
    SideNavigationComponent,
    DataTableComponent,
    SharedComponent,
    ViewComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents:[ViewComponent],

})
export class SharedModule {}
