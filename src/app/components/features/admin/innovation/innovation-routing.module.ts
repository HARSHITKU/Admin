import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InnovationComponent } from './innovation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-innovations',
    pathMatch: 'full',
  },
  {
    path: 'all-innovations',
    component: InnovationComponent,
  },
//   { path: 'new-user', component: NewUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InnovationRoutingModule {}
