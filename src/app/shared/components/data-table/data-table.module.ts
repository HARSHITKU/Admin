import { CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AgGridModule } from 'ag-grid-angular';
import { DataTableComponent } from "./data-table.component";

@NgModule({
  declarations: [

  ],
  imports: [    
    AgGridModule.withComponents([DataTableComponent])],
  exports: [

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DataTableModule {}
