import { Injectable } from '@angular/core';
import * as Crypto from 'crypto-js';

import { clamp } from '../utility-functions';

export interface Settings {
  difficulty: Difficulty;
  musicVolume: number;
}

export enum Difficulty {
  EASY,
  MEDIUM,
  HARD,
}

export interface Profile {
  id: string;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly storage = window.localStorage;
  private readonly settingsCacheTage = 'settingsCache';
  private readonly profileCacheTage = 'profileCache';
  private secret: string;

  setSecret(secret: string): void {
    this.secret = secret;
  }

  setDifficulty(difficulty: Difficulty): void {
    const settings = this.getSettings();
    settings.difficulty = difficulty;
    this.saveSettings(settings);
  }

  setMusicVolume(musicVolume: number): void {
    const settings = this.getSettings();
    settings.musicVolume = musicVolume;
    this.saveSettings(settings);
  }

  getSettings(): Settings {
    const settings = this.storage.getItem(this.settingsCacheTage);

    if (!settings) {
      const newSettings: Settings = {
        difficulty: Difficulty.MEDIUM,
        musicVolume: 1,
      };

      this.saveSettings(newSettings);
      return newSettings;
    }

    const decrypted = this.decrypt(settings);
    return JSON.parse(decrypted);
  }

  getProfile(): Profile {
    const profile = this.storage.getItem(this.profileCacheTage);

    if (!profile) {
      const newProfile = {
        id: '1',
        score: 0,
      };

      this.saveProfile(newProfile);
      return newProfile;
    }

    const decrypted = this.decrypt(profile);
    return JSON.parse(decrypted);
  }

  updateProfile(overallScore: number): void {
    const profile = this.getProfile();
    profile.score = clamp(profile.score + overallScore, 0, Number.MAX_SAFE_INTEGER);
    this.storage.setItem(this.profileCacheTage, this.enrypt(JSON.stringify(profile)));
  }

  private saveSettings(settings: Settings): void {
    this.storage.setItem(this.settingsCacheTage, this.enrypt(JSON.stringify(settings)));
  }

  private saveProfile(profile: Profile): void {
    this.storage.setItem(this.profileCacheTage, this.enrypt(JSON.stringify(profile)));
  }

  private decrypt(valueToDecrypt: string): string {
    const bytes = Crypto.AES.decrypt(valueToDecrypt, this.secret);
    return bytes.toString(Crypto.enc.Utf8);
  }

  private enrypt(valueToEncrypt: string): string {
    return Crypto.AES.encrypt(valueToEncrypt, this.secret).toString();
  }
}
