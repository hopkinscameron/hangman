import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { GameService } from './game/game.service';

@Injectable()
export class GameActivateGuard {
  constructor(private readonly router: Router, private readonly gameService: GameService) { }

  canActivate(): UrlTree | true {
    if (!this.gameService.startedAtHomeScreen()) {
      return this.router.createUrlTree(['']);
    }

    return true;
  }
}
