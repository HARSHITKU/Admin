import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DataTableModule } from './components/data-table/data-table.module';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { ViewUSerComponent } from '../components/features/admin/users/view-user/view-user.component';
import { DeleteUserComponent } from '../components/features/admin/users/delete-user/delete-user.component';
import { NewUserComponent } from '../components/features/admin/users/new-user/new-user.component';

@NgModule({
  declarations: [
    SharedComponent,
    TopNavigationComponent,
    SideNavigationComponent,
    DataTableComponent,
    DataTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    DataTableModule,
    AgGridModule.withComponents([
      ViewUSerComponent,
      DeleteUserComponent,
      NewUserComponent
    ]),
    HttpClientModule,
  ],
  exports: [
    TopNavigationComponent,
    SideNavigationComponent,
    DataTableComponent,
    SharedComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [ViewUSerComponent],
})
export class SharedModule {}
