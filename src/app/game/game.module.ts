import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/shared/material/material.module';
import { GameComponent } from './game.component';
import { GameOverComponent } from './game-over/game-over.component';
import { GameRoutingModule } from './game.routing';
import { PauseMenuComponent } from './pause-menu/pause-menu.component';

@NgModule({
  declarations: [
    GameComponent,
    GameOverComponent,
    PauseMenuComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GameRoutingModule,
  ]
})
export class GameModule { }
