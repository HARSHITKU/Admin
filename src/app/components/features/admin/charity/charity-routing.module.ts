import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharityComponent } from './charity.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-charities',
    pathMatch: 'full',
  },
  {
    path: 'all-charities',
    component: CharityComponent,
  },
//   { path: 'new-user', component: NewUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharityRoutingModule {}
