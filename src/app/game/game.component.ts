import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import dictionary from 'src/assets/dictionary.json';
import { isLetterDisabled, isValidLetter } from 'src/shared/keyboard/keyboard.component';
import { Difficulty, SettingsService } from '../../shared/settings/settings.service';
import { GameService } from './game.service';

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

  private guessingStateIndex: number;
  private timer: NodeJS.Timer;

  constructor(readonly gameService: GameService, private changeDetector: ChangeDetectorRef,
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

      console.log(this.elapsedTime);
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
    this.disabledLetters = '';
    this.guessingStateIndex = 0;
    this.imageGuessStateUrl = this.initialGuessStateUrl;

    let dictionaryLevel: string[];
    switch(this.settingsService.getDifficulty()) {
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
      this.guessingStateIndex += 1;
      this.imageGuessStateUrl = this.imageGuessStateUrl.replace(`strike-${this.guessingStateIndex - 1}`, `strike-${this.guessingStateIndex}`);
    }

    this.checkGameOver();
  }

  private checkGameOver(): void {
    if (this.wordToGuess.every(letter => !letter.masked)) {
      this.gameService.setWinner(true);
      this.gameService.setGameInProgress(false);
    } else if (this.guessingStateIndex === 7) {
      this.gameService.setGameInProgress(false);
    }
  }
}
