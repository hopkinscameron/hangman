import { Component } from '@angular/core';

import { GameService } from '../game/game.service';

@Component({
  selector: 'hangman-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private readonly gameService: GameService) {
    if (!this.gameService.startedAtHomeScreen()) {
      this.gameService.setStartedAtHomeScreen(true);
    }
  }
}
