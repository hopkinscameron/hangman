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
  providedIn: 'root'
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
    const achievedScoreIndexToInsertAt = this.getSortedIndex(leaderboard.achievedScores, achievedScore);
    const playerScoreIndexToInsertAt = this.getSortedIndex(leaderboard.playerScores, playerTotalScore);
    leaderboard.achievedScores = leaderboard.achievedScores.splice(achievedScoreIndexToInsertAt, 0, { score: achievedScore, date: now });
    leaderboard.playerScores = leaderboard.playerScores.splice(playerScoreIndexToInsertAt, 0, { score: playerTotalScore, date: now });

    // we keep a max of 10, lets drop off the lowest
    if (leaderboard.achievedScores.length > 10) {
      leaderboard.achievedScores = leaderboard.achievedScores.splice(0, 1);
    }

    if (leaderboard.playerScores.length > 10) {
      leaderboard.playerScores = leaderboard.playerScores.splice(0, 1);
    }

    console.log(leaderboard);
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

  private getSortedIndex(array: ScoreDate[], value: number): number {
    let low = 0;
    let high = array[array.length - 1].score;

    while (low < high) {
      const mid = (low + high) >>> 1;
      if (array[mid].score < value) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    return low;
  }
}
