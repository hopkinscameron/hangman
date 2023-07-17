import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CloseModule } from 'src/shared/close/close.module';
import { MaterialModule } from 'src/shared/material/material.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings.routing';

@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CloseModule,
    SettingsRoutingModule,
  ],
})
export class SettingsModule { }
