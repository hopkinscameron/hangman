import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import dictionary from 'src/assets/dictionary.json';
import { isLetterDisabled, isValidLetter } from 'src/shared/keyboard/keyboard.component';
import { Difficulty, SettingsService } from 'src/shared/settings/settings.service';
import { clamp } from 'src/shared/utility-functions';
import { GameService } from './game.service';
import { GameOver } from './game-over/game-over.component';

interface KeyboardLetter {
  letter: string;
  masked: boolean;
}

interface TimeSpan {
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'hangman-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit, OnDestroy {
  readonly initialGuessStateUrl = '/assets/images/game/strike-0.png';
  wordToGuess: KeyboardLetter[];
  imageGuessStateUrl = this.initialGuessStateUrl;
  disabledLetters: string;
  elapsedTime: TimeSpan = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  gameOver: GameOver;

  private guessingStateIndex: number;
  private timer: NodeJS.Timer;
  private difficulty: Difficulty;

  constructor(readonly gameService: GameService, private readonly changeDetector: ChangeDetectorRef,
    private readonly settingsService: SettingsService) {
    this.gameService.setGameInProgress(true);
  }

  @HostListener('document:keydown.esc', ['$event'])
  onEsc() {
    if (this.gameService.isGameInProgress()) {
      const paused = this.gameService.isPaused();
      if (!paused) {
        this.gameService.setPaused(true);
        clearInterval(this.timer);
      } else {
        this.gameService.setPaused(false);
        this.count();
        this.timer = setInterval(() => this.count(), 1000);
      }
    }
  }

  ngOnInit(): void {
    this.startGame();
    this.count();
    this.timer = setInterval(() => this.count(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  setElapsedTime(): void {
    if (this.elapsedTime.minutes >= 60) {
      this.elapsedTime.hours += 1;
      this.elapsedTime.minutes = 0;
    }

    if (this.elapsedTime.seconds >= 60) {
      this.elapsedTime.minutes += 1;
      this.elapsedTime.seconds = 0;
    }
  }

  closeMenu(): void {
    this.gameService.setPaused(false);
  }

  playAgain(): void {
    this.startGame();
    this.gameService.setWinner(false);
    this.gameService.setGameInProgress(true);
  }

  letterClicked(letter: string): void {
    if (!this.gameService.isGameInProgress() || this.gameService.isPaused()) {
      return;
    }

    const lowerLetter = letter.toLowerCase();
    if (isValidLetter(lowerLetter) && !isLetterDisabled(this.disabledLetters, lowerLetter)) {
      this.disabledLetters = this.disabledLetters.concat(lowerLetter);
      this.checkLetterInWord(lowerLetter);
    }
  }

  private count(): void {
    this.changeDetector.detectChanges();
    this.elapsedTime.seconds += 1;
    this.setElapsedTime();
  }

  private startGame(): void {
    this.gameOver = {
      winner: false,
      scoreBreakdown: null,
      previousScore: this.settingsService.getProfile().score,
    };
    this.disabledLetters = '';
    this.guessingStateIndex = 0;
    this.imageGuessStateUrl = this.initialGuessStateUrl;

    let dictionaryLevel: string[];
    this.difficulty = this.settingsService.getSettings().difficulty;
    switch(this.difficulty) {
      case Difficulty.EASY:
        dictionaryLevel = dictionary.easy;
        break;
      case Difficulty.MEDIUM:
        dictionaryLevel = dictionary.medium;
        break;
      case Difficulty.HARD:
        dictionaryLevel = dictionary.hard;
        break;
    }

    const word = dictionaryLevel[Math.floor(Math.random() * dictionaryLevel.length)];
    console.log(word);
    // TODO: wonder if it's better to make this a 2D array instead of spaces
    this.wordToGuess = word.split('').map((letter) => {
      return { letter: letter.toLowerCase(), masked: letter !== ' ', };
    });
  }

  private checkLetterInWord(letter: string): void {
    let letterFound = false;
    this.wordToGuess = this.wordToGuess.map((letterInWordToGuess) => {
      if (letterInWordToGuess.letter === letter) {
        letterFound = true;
        letterInWordToGuess.masked = false;
      }

      return letterInWordToGuess;
    });

    if (!letterFound) {
      this.guessingStateIndex = clamp(this.guessingStateIndex + 1, 0, 7);
      this.imageGuessStateUrl = this.imageGuessStateUrl.replace(`strike-${this.guessingStateIndex - 1}`, `strike-${this.guessingStateIndex}`);
    }

    this.checkGameOver();
  }

  private checkGameOver(): void {
    if (this.wordToGuess.every(letter => !letter.masked)) {
      this.handleGameOver(true);
    } else if (this.guessingStateIndex === 7) {
      this.handleGameOver(false);
    }
  }

  private handleGameOver(winner: boolean): void {
    clearInterval(this.timer);
    const scoreBreakdown = this.gameService.calculateScore(this.guessingStateIndex, this.difficulty, this.getTimeInSeconds(this.elapsedTime));
    this.gameOver.winner = winner;
    this.gameOver.scoreBreakdown = scoreBreakdown;
    this.settingsService.updateProfile(scoreBreakdown.achievedScore);
    this.gameService.setWinner(winner);
    this.gameService.setGameInProgress(false);
  }

  private getTimeInSeconds(elapsedTime: TimeSpan): number {
    return elapsedTime.hours * 3600 + elapsedTime.minutes * 60 + elapsedTime.seconds;
  }
}
