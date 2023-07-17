import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private startedAtHome = true;
  private gameInProgress = false;
  private winner = false;
  private paused = false;

  setStartedAtHomeScreen(startedAtHome: boolean): void {
    this.startedAtHome = startedAtHome;
  }

  startedAtHomeScreen(): boolean {
    return this.startedAtHome;
  }

  setGameInProgress(gameInProgress: boolean): void {
    this.gameInProgress = gameInProgress;
  }

  isGameInProgress(): boolean {
    return this.gameInProgress;
  }

  setWinner(winner: boolean): void {
    this.winner = winner;
  }

  isWinner(): boolean {
    return this.winner;
  }

  setPaused(paused: boolean): void {
    this.paused = paused;
  }

  isPaused(): boolean {
    return this.paused;
  }
}