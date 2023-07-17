import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

const ALLOWED_LETTERS = 'qwertyuiopasdfghjklzxcvbnm';

export function isValidLetter(letter: string): boolean {
  return ALLOWED_LETTERS.includes(letter);
}

export function isLetterDisabled(disabledLetters: string, letter: string): boolean {
  const lowerLetter = letter?.toLowerCase();
  return disabledLetters?.includes(lowerLetter);
}

@Component({
  selector: 'hangman-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  @Input() disabledLetters = '';
  @Output() letterClicked = new EventEmitter<string>();

  readonly keyboard = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.letterClicked.emit(event.key);
  }

  isLetterDisabled(letter: string): boolean {
    return isLetterDisabled(this.disabledLetters, letter);
  }

  clickLetter(letter: string): void {
    this.letterClicked.emit(letter);
  }
}
