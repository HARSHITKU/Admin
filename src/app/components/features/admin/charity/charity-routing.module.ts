import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChairtyComponent } from './charity.component';
import { NewCharityComponent } from './new-charity/new-charity.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-charities',
    pathMatch: 'full',
  },
  {
    path: 'all-charities',
    component: ChairtyComponent,
  },
  { path: 'new-charity', component: NewCharityComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharityRoutingModule {}
