import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hangman-pause-menu',
  templateUrl: './pause-menu.component.html',
  styleUrls: ['./pause-menu.component.scss'],
})
export class PauseMenuComponent {
  @Output() closeMenu = new EventEmitter();

  shouldShowSettings = false;
  shouldShowLeaderboard = false;

  constructor(private readonly router: Router) { }

  closePauseMenu(): void {
    this.closeMenu.emit();
  }

  quit(): Promise<boolean> {
    return this.router.navigate(['']);
  }
}
