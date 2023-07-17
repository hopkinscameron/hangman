import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CloseModule } from 'src/shared/close/close.module';
import { MaterialModule } from 'src/shared/material/material.module';
import { ProceedWithCautionModule } from 'src/shared/proceed-with-caution/proceed-with-caution.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CloseModule,
    ProceedWithCautionModule,
  ],
  exports: [
    SettingsComponent,
  ],
})
export class SettingsModule { }
