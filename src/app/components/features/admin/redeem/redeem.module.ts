import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeemRoutingModule } from './redeem-routing.module';
import { RedeemComponent } from './redeem.component';



@NgModule({
  declarations: [
    RedeemComponent
  ],
  imports: [
    CommonModule,
    RedeemRoutingModule
  ]
})
export class RedeemModule { }
