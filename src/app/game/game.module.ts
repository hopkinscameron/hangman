import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CloseModule } from 'src/shared/close/close.module';
import { KeyboardModule } from 'src/shared/keyboard/keyboard.module';
import { MaterialModule } from 'src/shared/material/material.module';
import { SettingsModule } from 'src/shared/settings/settings.module';
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
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    KeyboardModule,
    CloseModule,
    SettingsModule,
    GameRoutingModule,
  ],
})
export class GameModule { }
