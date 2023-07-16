import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hangman-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent {
  @Input() winner = false;
  @Output() playAgainClicked = new EventEmitter();

  constructor(private router: Router) { }

  playAgain(): void {
    this.playAgainClicked.emit();
  }

  quit(): Promise<boolean> {
    return this.router.navigate(['']);
  }
}
