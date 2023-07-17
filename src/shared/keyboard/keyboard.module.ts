import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/shared/material/material.module';
import { KeyboardComponent } from './keyboard.component';

@NgModule({
  declarations: [
    KeyboardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    KeyboardComponent,
  ],
})
export class KeyboardModule { }
