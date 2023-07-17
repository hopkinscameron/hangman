import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderboardModule } from 'src/shared/leaderboard/leaderboard.module';
import { MaterialModule } from 'src/shared/material/material.module';
import { LeaderboardScreenComponent } from './leaderboard-screen.component';
import { LeaderboardScreenRoutingModule } from './leaderboard-screen.routing';

@NgModule({
  declarations: [
    LeaderboardScreenComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LeaderboardModule,
    LeaderboardScreenRoutingModule,
  ],
})
export class LeaderboardScreenModule { }
