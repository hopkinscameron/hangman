import { Injectable } from '@angular/core';
import * as Crypto from 'crypto-js';

export interface ScoreDate {
  score: number;
  date: Date;
}

export interface Leaderboard {
  achievedScores: ScoreDate[];
  playerScores: ScoreDate[];
}

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private readonly storage = window.localStorage;
  private readonly leaderboardCacheTage = 'leaderboardCache';
  private secret: string;

  setSecret(secret: string): void {
    this.secret = secret;
  }

  addToLeaderboard(achievedScore: number, playerTotalScore: number): void {
    const now = new Date();
    const leaderboard = this.getLeaderboard();
    const achievedScoreIndexToInsertAt = this.getSortedIndex(leaderboard.achievedScores, achievedScore) + 1;
    const playerScoreIndexToInsertAt = this.getSortedIndex(leaderboard.playerScores, playerTotalScore) + 1;
    const achievedScoreToAdd = { score: achievedScore, date: now };
    const playerScoreToAdd = { score: playerTotalScore, date: now };

    if (!leaderboard.achievedScores.length && achievedScore > 0) {
      leaderboard.achievedScores.push(achievedScoreToAdd);
    } else if (achievedScore > 0) {
      leaderboard.achievedScores.splice(achievedScoreIndexToInsertAt, 0, achievedScoreToAdd);
    }

    if (!leaderboard.playerScores.length && playerTotalScore > 0) {
      leaderboard.playerScores.push(playerScoreToAdd);
    } else if (playerTotalScore > 0) {
      leaderboard.playerScores.splice(playerScoreIndexToInsertAt, 0, playerScoreToAdd);
    }

    // we keep a max of 10, lets drop off the lowest
    if (leaderboard.achievedScores.length > 10) {
      leaderboard.achievedScores.splice(0, 1);
    }

    if (leaderboard.playerScores.length > 10) {
      leaderboard.playerScores.splice(0, 1);
    }

    this.saveLeaderboard(leaderboard);
  }

  getLeaderboard(): Leaderboard {
    const leaderboard = this.storage.getItem(this.leaderboardCacheTage);

    if (!leaderboard) {
      const newLeaderboard: Leaderboard = {
        achievedScores: [],
        playerScores: [],
      };

      this.saveLeaderboard(newLeaderboard);
      return newLeaderboard;
    }

    const bytes = Crypto.AES.decrypt(leaderboard, this.secret);
    return JSON.parse(bytes.toString(Crypto.enc.Utf8));
  }

  private saveLeaderboard(leaderboard: Leaderboard): void {
    const encrypted = Crypto.AES.encrypt(JSON.stringify(leaderboard), this.secret).toString();
    this.storage.setItem(this.leaderboardCacheTage, encrypted);
  }

  private getSortedIndex(array: ScoreDate[], value: number, startPoint?: number, endPoint?: number): number {
    if (!array.length) {
      return 0;
    }

    if (array.length === 1) {
      return array[0].score > value ? 0 : 1;
    }

    startPoint = startPoint || 0;
    endPoint = endPoint || array.length;
    var pivot = startPoint + (endPoint - startPoint) / 2;

    if (endPoint - startPoint <= 1 || array[pivot].score === value) {
      return pivot;
    }

    if (array[pivot].score < value) {
      return this.getSortedIndex(array, value, pivot, endPoint);
    }

    return this.getSortedIndex(array, value, startPoint, pivot);
  }
}
