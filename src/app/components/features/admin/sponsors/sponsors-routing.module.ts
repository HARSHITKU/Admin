import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsorsComponent } from './sponsors.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-sponsors',
    pathMatch: 'full',
  },
  {
    path: 'all-sponsors',
    component: SponsorsComponent,
  },
//   { path: 'new-user', component: NewUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SponsorsRoutingModule {}
