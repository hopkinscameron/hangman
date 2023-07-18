import { Injectable } from '@angular/core';

import { Difficulty } from 'src/shared/settings/settings.service';
import { clamp } from 'src/shared/utility-functions';

export interface GameScoreBreakdown {
  baseScore: number;
  numberOfTriesMultipler: number;
  difficultyMultiplier: number;
  baseSubtraction: number;
  timeItTookMultiplier: number;
  achievedScore: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly baseScore = 100;
  private readonly baseSubtraction = 25;
  private startedAtHome = false;
  private gameInProgress = false;
  private winner = false;
  private paused = false;

  initializeGame(gameStarted?: boolean): void {
    this.gameInProgress = gameStarted || false;
    this.winner = false;
    this.paused = false;
  }

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

  // Algorithm start with base 100, multiplier of 7 - guessingStateIndex, multiplier of difficulty level of 1x, 2x, 3x minus multiplier of time it took
  // (100 x (7 - 3 (3 tries it took)) x 1 (Easy)) - (25 base x 1 (took me 60 seconds)) = 375 score
  // (100 x (7 - 5 (5 tries it took)) x 2 (Medium)) - (25 base x 2 (took me 5 mins)) = 350 score
  // (100 x (7 - 6 (6 tries it took)) x 3 (Hard)) - (25 base x 3 (took me 12 mins)) = 225 score
  // easy 60 seconds or less 1x, 3 mins or less 2x, 3x
  // medium 3 mins or less 1x, 5 mins or less 2x, 3x
  // hard 5 mins seconds or less 1x, 8 mins or less 2x, 3x
  calculateScore(numberOfTries: number, difficulty: Difficulty, timeItTookInSeconds: number): GameScoreBreakdown {
    const gameScoreBreakdown: GameScoreBreakdown = {
      baseScore: this.baseScore,
      numberOfTriesMultipler: 7 - numberOfTries,
      difficultyMultiplier: this.getDifficultyMultiplier(difficulty),
      baseSubtraction: this.baseSubtraction,
      timeItTookMultiplier: this.getTimeItTookSubtractionMultiplier(timeItTookInSeconds, difficulty),
      achievedScore: 0,
    };
    gameScoreBreakdown.achievedScore = clamp(gameScoreBreakdown.baseScore * gameScoreBreakdown.numberOfTriesMultipler * gameScoreBreakdown.difficultyMultiplier
      - gameScoreBreakdown.baseSubtraction * gameScoreBreakdown.timeItTookMultiplier, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    return gameScoreBreakdown;
  }

  private getDifficultyMultiplier(difficulty: Difficulty): number {
    switch (difficulty) {
      case Difficulty.MEDIUM:
        return 2;
      case Difficulty.HARD:
        return 3;
      default:
        return 1;
    }
  }

  private getTimeItTookSubtractionMultiplier(timeItTookInSeconds: number, difficulty: Difficulty): number {
    switch (difficulty) {
      case Difficulty.MEDIUM:
        // medium 3 mins or less 1x, 5 mins or less 2x, 3x
        if (timeItTookInSeconds < 60 * 3) {
          return 1;
        } else if (timeItTookInSeconds < 60 * 5) {
          return 2;
        }

        return 3;
      case Difficulty.HARD:
        // hard 5 mins seconds or less 1x, 8 mins or less 2x, 3x
        if (timeItTookInSeconds < 60 * 5) {
          return 1;
        } else if (timeItTookInSeconds < 60 * 8) {
          return 2;
        }

        return 3;
      default:
        // easy 60 seconds or less 1x, 3 mins or less 2x, 3x
        if (timeItTookInSeconds < 60) {
          return 1;
        } else if (timeItTookInSeconds < 60 * 3) {
          return 2;
        }

        return 3;
    }
  }
}
