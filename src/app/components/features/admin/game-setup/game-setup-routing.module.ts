import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSetupComponent } from './game-setup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-games',
    pathMatch: 'full',
  },
  {
    path: 'all-games',
    component: GameSetupComponent,
  },
//   { path: 'new-user', component: NewUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
