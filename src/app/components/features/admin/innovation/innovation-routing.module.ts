import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InnovationComponent } from './innovation.component';
import { NewInnovationComponent } from './new-innovation/new-innovation.component';

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
  { path: 'new-innovation', component: NewInnovationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InnovationRoutingModule {}
