import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { isValidLetter, isLetterDisabled } from 'src/shared/keyboard/keyboard.component';

@Component({
  selector: 'hangman-how-to-play',
  templateUrl: './how-to-play.component.html',
  styleUrls: ['./how-to-play.component.scss']
})
export class HowToPlayComponent {
  readonly rules = [
    `In this single player game, the "host" is the computer.
    The host will choose the word and draw the hangman.
    You will guess letters to try and identify the word the host picked.`,
    `The difficulty of the word can come from the length of the word. You
    get to choose the difficulty in the <a [routerLink]="['/']">settings</a> menu.`,
    `Each blank line will serve as a letter in the word.`,
    `Start guessing the word by clicking the keyboard on the screen or using your keyboard.
    The only valid letters will be in the alphabet (a-z). All words are case insensitive.`,
    `If a letter is guessed correctly, you will see the letter replace one or more of the blank
    lines.`,
    `If a letter is guessed incorrectly, you will get a strike that brings you closer to losing.
    The host will draw a simple stick figure of a man being hung, adding a new part to the drawing
    with every wrong answer. You will get 7 guesses before you ultimately lose the game.`
  ]
  disabledLetters = '';

  constructor(private readonly router: Router) { }

  closeMenu(): Promise<boolean> {
    return this.router.navigate(['']);
  }

  letterClicked(letter: string): void {
    const lowerLetter = letter.toLowerCase();
    if (isValidLetter(lowerLetter) && !isLetterDisabled(this.disabledLetters, lowerLetter)) {
      this.disabledLetters = this.disabledLetters.concat(lowerLetter);
    }
  }
}
