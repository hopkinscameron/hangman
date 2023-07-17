import { Component, HostListener, OnInit } from '@angular/core';

import dictionary from 'src/assets/dictionary.json';
import { isLetterDisabled, isValidLetter } from 'src/shared/keyboard/keyboard.component';
import { Difficulty, SettingsService } from '../settings/settings.service';

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
  gameOver = false;
  winner = false;
  paused = false;
  disabledLetters: string;

  private guessingStateIndex: number;

  constructor(private settingsService: SettingsService) { }

  @HostListener('document:keydown.esc', ['$event'])
  onEsc() {
    if (!this.gameOver) {
      this.paused = !this.paused;
    }
  }

  ngOnInit(): void {
    this.startGame();
  }

  closeMenu(): void {
    this.paused = false;
  }

  playAgain(): void {
    this.startGame();
    this.winner = false;
    this.gameOver = false;
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
      this.winner = true;
      this.gameOver = true;
    } else if (this.guessingStateIndex === 7) {
      this.gameOver = true;
    }
  }
}
