import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-setup-routing.module';
import { GameSetupComponent } from './game-setup.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GameSetupComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule
  ]
})
export class GameSetupModule { }
