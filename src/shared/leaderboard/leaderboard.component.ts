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

  constructor(private readonly router: Router,  private readonly leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    this.leaderboard = this.leaderboardService.getLeaderboard();
    this.playerScoresDataSource.data = this.leaderboard.playerScores.map(this.mapRecordToTableModel).reverse();
    this.achievedScoresDataSource.data = this.leaderboard.achievedScores.map(this.mapRecordToTableModel).reverse();
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
