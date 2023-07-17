import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { GameScoreBreakdown } from '../game.service';
import { SettingsService } from 'src/shared/settings/settings.service';

export interface GameOver {
  winner: boolean;
  scoreBreakdown: GameScoreBreakdown;
  previousScore: number;
}

@Component({
  selector: 'hangman-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameOverComponent implements OnInit {
  @Input() gameOver: GameOver;
  @Output() playAgainClicked = new EventEmitter();

  readonly playersNewScore;
  showButtons = false;

  constructor(private readonly router: Router, private changeDetector: ChangeDetectorRef,
    private readonly settingsService: SettingsService) {
    this.playersNewScore = this.settingsService.getProfile().score;
  }

  ngOnInit(): void {
    window.setTimeout(() => {
      this.showButtons = true;
      this.changeDetector.detectChanges();
    }, 3000);
  }

  playAgain(): void {
    this.playAgainClicked.emit();
  }

  quit(): Promise<boolean> {
    return this.router.navigate(['']);
  }
}
