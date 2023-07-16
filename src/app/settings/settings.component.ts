import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Difficulty, SettingsService } from './settings.service';

interface SettingsControls {
  difficultyCtrl: FormControl<Difficulty>;
}

@Component({
  selector: 'hangman-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  readonly difficultyLevel = Difficulty;
  settingsForm: FormGroup<SettingsControls>;

  constructor(private router: Router, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.createForms();
  }

  closeMenu(): Promise<boolean> {
    this.settingsService.setDifficulty(this.settingsForm.controls.difficultyCtrl.value);
    return this.router.navigate(['']);
  }

  private createForms(): void {
    this.settingsForm = new FormGroup<SettingsControls>({
      difficultyCtrl: new FormControl<Difficulty>(this.settingsService.getDifficulty()),
    });
  }
}
