import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { AutologinGuard } from './guard/autologin.guard';

const routes: Routes = [
  // Change the name of below router as per the application name
  {
    path: 'chotapaisa',
    loadChildren: () => import('./components/features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AutologinGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
