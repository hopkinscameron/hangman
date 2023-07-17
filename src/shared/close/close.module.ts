import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/shared/material/material.module';
import { CloseComponent } from './close.component';

@NgModule({
  declarations: [
    CloseComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    CloseComponent,
  ],
})
export class CloseModule { }
