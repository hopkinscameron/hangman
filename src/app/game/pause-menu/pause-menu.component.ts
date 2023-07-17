import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hangman-pause-menu',
  templateUrl: './pause-menu.component.html',
  styleUrls: ['./pause-menu.component.scss'],
})
export class PauseMenuComponent {
  @Output() close = new EventEmitter();

  shouldShowSettings = false;
  shouldShowLeaderboards = false;

  constructor(private readonly router: Router) { }

  closeMenu(): void {
    this.close.emit();
  }

  quit(): Promise<boolean> {
    return this.router.navigate(['']);
  }
}
