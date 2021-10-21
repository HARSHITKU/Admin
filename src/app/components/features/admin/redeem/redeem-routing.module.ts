import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedeemComponent } from './redeem.component';
import { NewRedeemComponent } from './new-redeem/new-redeem.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-redeems',
    pathMatch: 'full',
  },
  {
    path: 'all-redeems',
    component: RedeemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedeemRoutingModule {}
