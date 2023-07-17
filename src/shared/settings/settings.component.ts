import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { ProceedWithCautionComponent } from 'src/shared/proceed-with-caution/proceed-with-caution.component';
import { GameService } from 'src/app/game/game.service';
import { Difficulty, Settings, SettingsService } from './settings.service';

interface SettingsControls {
  difficultyCtrl: FormControl<Difficulty>;
  volumeCtrl: FormControl<number>;
}

@Component({
  selector: 'hangman-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @Input() shouldNavigateOnClose = true;
  @Output() closeClicked = new EventEmitter();

  readonly difficultyLevel = Difficulty;
  settingsForm: FormGroup<SettingsControls>;

  private settings: Settings;

  constructor(private readonly router: Router, private readonly dialog: MatDialog,
    private readonly settingsService: SettingsService, private readonly gameService: GameService) { }

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
    this.createForms();
  }

  async closeMenu(): Promise<boolean> {
    if (this.gameService.isGameInProgress() && this.settingsForm.controls.difficultyCtrl.value !== this.settings.difficulty) {
      const dialogRef = this.dialog.open(ProceedWithCautionComponent);

      const proceed = await lastValueFrom(dialogRef.afterClosed());

      if (!proceed) {
        return false;
      }
    }

    return await this.finishClosing();
  }

  private createForms(): void {
    this.settingsForm = new FormGroup<SettingsControls>({
      difficultyCtrl: new FormControl<Difficulty>(this.settings.difficulty),
      volumeCtrl: new FormControl<number>(this.settings.musicVolume),
    });
  }

  private finishClosing(): Promise<boolean> {
    this.settingsService.setDifficulty(this.settingsForm.controls.difficultyCtrl.value);
    this.settingsService.setMusicVolume(this.settingsForm.controls.volumeCtrl.value);

    if (this.shouldNavigateOnClose) {
      return this.router.navigate(['']);
    }

    this.closeClicked.emit();
    return Promise.resolve(true);
  }
}
