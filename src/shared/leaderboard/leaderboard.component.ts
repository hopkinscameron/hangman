import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Leaderboard, LeaderboardService, ScoreDate } from './leaderboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { getLocalDate } from '../utility-functions';

interface ScoreDateTableItem extends ScoreDate {
  localDate: string;
}

@Component({
  selector: 'hangman-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  @Input() shouldNavigateOnClose = true;
  @Input() isFromPausedScreen = true;
  @Output() closeClicked = new EventEmitter();

  leaderboard: Leaderboard;
  displayedColumns: string[] = ['date', 'score'];
  achievedScoresDataSource = new MatTableDataSource<ScoreDateTableItem>();
  playerScoresDataSource = new MatTableDataSource<ScoreDateTableItem>();

  private readonly fakeData: ScoreDate[] = [
    {
      score: 193,
      date: new Date('11/05/2022'),
    },
    {
      score: 256,
      date: new Date('09/20/2022'),
    },
    {
      score: 678,
      date: new Date('05/04/2023'),
    },
    {
      score: 888,
      date: new Date('01/18/2023'),
    },
    {
      score: 1000,
      date: new Date('02/14/2023'),
    },
    {
      score: 2000,
      date: new Date('05/03/2023'),
    },
    {
      score: 2345,
      date: new Date('10/07/2022'),
    },
    {
      score: 2399,
      date: new Date('06/28/2023'),
    },
    {
      score: 5003,
      date: new Date('11/09/2022'),
    },
    {
      score: 6783,
      date: new Date('02/05/2023'),
    }];

  constructor(private readonly router: Router,  private readonly leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    this.leaderboard = this.leaderboardService.getLeaderboard();
    this.leaderboard.playerScores = this.leaderboard.achievedScores = this.fakeData;
    this.playerScoresDataSource.data = this.leaderboard.playerScores.map(this.mapRecordToTableModel);
    this.achievedScoresDataSource.data = this.leaderboard.achievedScores.map(this.mapRecordToTableModel);
  }

  closeMenu(): Promise<boolean> {
    if (this.shouldNavigateOnClose) {
      return this.router.navigate(['']);
    }

    this.closeClicked.emit();
    return Promise.resolve(true);
  }

  private mapRecordToTableModel(record: ScoreDate): ScoreDateTableItem {
    return {
      ...structuredClone(record),
      localDate: getLocalDate(record.date),
    };
  }
}
