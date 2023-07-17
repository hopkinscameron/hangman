import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsModule } from 'src/shared/settings/settings.module';
import { SettingsScreenComponent } from './settings-screen.component';
import { SettingsScreenRoutingModule } from './settings-screen.routing';

@NgModule({
  declarations: [
    SettingsScreenComponent,
  ],
  imports: [
    CommonModule,
    SettingsModule,
    SettingsScreenRoutingModule,
  ],
})
export class SettingsScreenModule { }
