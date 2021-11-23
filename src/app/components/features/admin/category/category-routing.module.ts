import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { NewCategoryComponent } from './new-category/new-category.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-categories',
    pathMatch: 'full',
  },
  {
    path: 'all-categories',
    component: CategoryComponent,
  },
  { path: 'new-category', component: NewCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
