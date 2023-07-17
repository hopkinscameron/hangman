import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { ProceedWithCautionComponent } from 'src/shared/proceed-with-caution/proceed-with-caution.component';
import { GameService } from 'src/app/game/game.service';
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
  @Input() shouldNavigateOnClose = true;
  @Output() onClose = new EventEmitter();

  readonly difficultyLevel = Difficulty;
  settingsForm: FormGroup<SettingsControls>;

  constructor(private readonly router: Router, private readonly dialog: MatDialog,
    private readonly settingsService: SettingsService, private readonly gameService: GameService) { }

  ngOnInit(): void {
    this.createForms();
  }

  async closeMenu(): Promise<boolean> {
    if (this.gameService.isGameInProgress() && this.settingsForm.controls.difficultyCtrl.value !== this.settingsService.getDifficulty()) {
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
      difficultyCtrl: new FormControl<Difficulty>(this.settingsService.getDifficulty()),
    });
  }

  private finishClosing(): Promise<boolean> {
    this.settingsService.setDifficulty(this.settingsForm.controls.difficultyCtrl.value);

    if (this.shouldNavigateOnClose) {
      return this.router.navigate(['']);
    }

    this.onClose.emit();
    return Promise.resolve(true);
  }
}
