import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InnovationRoutingModule } from './innovation-routing.module';
import { DeleteInnovationComponent } from './delete-innovation/delete-innovation.component'
import { NewInnovationComponent } from './new-innovation/new-innovation.component';
import { ViewInnovationComponent } from './view-innovation/view-innovation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InnovationComponent } from './innovation.component'



@NgModule({
  declarations: [DeleteInnovationComponent, NewInnovationComponent, ViewInnovationComponent, InnovationComponent],
  imports: [
    CommonModule,
    InnovationRoutingModule,
    SharedModule
  ],
  exports: [DeleteInnovationComponent, NewInnovationComponent, ViewInnovationComponent, InnovationComponent]
})
export class InnovationModule { }
