import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsorsRoutingModule } from './sponsors-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SponsorsComponent } from './sponsors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SponsorsComponent
  ],
  imports: [
    CommonModule,
    SponsorsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SponsorsModule { }
