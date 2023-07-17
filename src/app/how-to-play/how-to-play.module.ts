import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloseModule } from 'src/shared/close/close.module';
import { KeyboardModule } from 'src/shared/keyboard/keyboard.module';
import { MaterialModule } from 'src/shared/material/material.module';
import { HowToPlayComponent } from './how-to-play.component';
import { HowToPlayRoutingModule } from './how-to-play.routing';

@NgModule({
  declarations: [
    HowToPlayComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    KeyboardModule,
    CloseModule,
    HowToPlayRoutingModule,
  ],
})
export class HowToPlayModule { }
