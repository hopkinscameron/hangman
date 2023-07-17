import { Injectable } from '@angular/core';

export enum Difficulty {
  EASY,
  MEDIUM,
  HARD,
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly storage = window.localStorage;
  private readonly settingsCacheTage = 'settingsCache';

  setDifficulty(difficulty: Difficulty): void {
    this.storage.setItem(this.settingsCacheTage, JSON.stringify(difficulty));
  }

  getDifficulty(): Difficulty {
    const difficulty = this.storage.getItem(this.settingsCacheTage);
    return difficulty ? JSON.parse(difficulty) : Difficulty.MEDIUM;
  }
}
