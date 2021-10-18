import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharityRoutingModule } from './charity-routing.module';
import { ChairtyComponent } from './charity.component';
import { NewCharityComponent } from './new-charity/new-charity.component';
import { ViewCharityComponent } from './view-charity/view-charity.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteChairtyComponent } from './delete-charity/delete-charity.component';



@NgModule({
  declarations: [
    ChairtyComponent,
    NewCharityComponent,
    ViewCharityComponent,
    DeleteChairtyComponent
  ],
  imports: [
    CommonModule,
    CharityRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ChairtyComponent,
    NewCharityComponent,
    ViewCharityComponent
  ]
})
export class CharityModule { }
