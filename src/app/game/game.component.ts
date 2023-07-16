import { Component, HostListener, OnInit } from '@angular/core';

import dictionary from 'src/assets/dictionary.json';

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
  readonly keyboard = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];
  readonly initialGuessStateUrl = '/assets/images/game/strike-0.png';
  wordToGuess: KeyboardLetter[];
  imageGuessStateUrl = this.initialGuessStateUrl;
  gameOver = false;
  winner = false;
  paused = false;

  private readonly allowedLetters = 'qwertyuiopasdfghjklzxcvbnm';
  private disabledLetters: string;
  private guessingStateIndex: number;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.letterClicked(event.key);
  }

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
    if (this.isValidLetter(lowerLetter) && !this.isLetterDisabled(lowerLetter)) {
      this.disabledLetters = this.disabledLetters.concat(lowerLetter);
      this.checkLetterInWord(lowerLetter);
    }
  }

  isLetterDisabled(letter: string): boolean {
    const lowerLetter = letter.toLowerCase();
    return this.disabledLetters.includes(lowerLetter);
  }

  private startGame(): void {
    this.disabledLetters = '';
    this.guessingStateIndex = 0;
    this.imageGuessStateUrl = this.initialGuessStateUrl;
    const word = dictionary.easy[Math.floor(Math.random() * dictionary.easy.length)];
    console.log(word);
    // TODO: wonder if it's better to make this a 2D array instead of spaces
    this.wordToGuess = word.split('').map((letter) => {
      return { letter: letter.toLowerCase(), masked: letter !== ' ', };
    });
  }

  private isValidLetter(letter: string): boolean {
    return this.allowedLetters.includes(letter);
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
