import { Component } from '@angular/core';

import { SettingsService } from 'src/shared/settings/settings.service';

@Component({
  selector: 'hangman-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'hangman';

  constructor(private readonly settingsService: SettingsService) {
    // initialize everything if they aren't already
    // TODO: add enviornment variables
    this.settingsService.setSecret('v66Kf79MsQ3CJk0Lf4mD');
    this.settingsService.getSettings();
    this.settingsService.getProfile();
  }
}
