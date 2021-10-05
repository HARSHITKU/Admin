import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedeemComponent } from './redeem.component';

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
//   { path: 'new-user', component: NewUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedeemRoutingModule {}
