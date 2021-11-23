import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      { path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule), 
      },
      {
        path: 'application-setup',
        loadChildren: () =>
          import('./application-settings/application-settings.module').then((m) => m.ApplicationSettingsModule),
      },
      {
        path: 'game-setup',
        loadChildren: () =>
          import('./game-setup/game-setup.module').then((m) => m.GameSetupModule),
      },
      {
        path: 'charity',
        loadChildren: () =>
          import('./charity/charity.module').then((m) => m.CharityModule),
      },
      {
        path: 'innovation',
        loadChildren: () =>
          import('./innovation/innovation.module').then((m) => m.InnovationModule),
      },
      {
        path: 'redeem',
        loadChildren: () =>
          import('./redeem/redeem.module').then((m) => m.RedeemModule),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'sponsors',
        loadChildren: () =>
          import('./sponsors/sponsors.module').then((m) => m.SponsorsModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./category/category.module').then((m) => m.CategoryModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
