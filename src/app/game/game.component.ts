import { Component, HostListener, OnInit } from '@angular/core';

import dictionary from 'src/assets/dictionary.json';
import { isLetterDisabled, isValidLetter } from 'src/shared/keyboard/keyboard.component';
import { Difficulty, SettingsService } from '../../shared/settings/settings.service';
import { GameService } from './game.service';

interface KeyboardLetter {
  letter: string;
  masked: boolean;
}

@Component({
  selector: 'hangman-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  readonly initialGuessStateUrl = '/assets/images/game/strike-0.png';
  wordToGuess: KeyboardLetter[];
  imageGuessStateUrl = this.initialGuessStateUrl;

  disabledLetters: string;

  private guessingStateIndex: number;

  constructor(readonly gameService: GameService, private readonly settingsService: SettingsService) {
    this.gameService.setGameInProgress(true);
  }

  @HostListener('document:keydown.esc', ['$event'])
  onEsc() {
    if (this.gameService.isGameInProgress()) {
      this.gameService.setPaused(!this.gameService.isPaused());
    }
  }

  ngOnInit(): void {
    this.startGame();
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
