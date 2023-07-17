import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/shared/material/material.module';
import { ProceedWithCautionComponent } from './proceed-with-caution.component';

@NgModule({
  declarations: [
    ProceedWithCautionComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    ProceedWithCautionComponent,
  ],
})
export class ProceedWithCautionModule { }
