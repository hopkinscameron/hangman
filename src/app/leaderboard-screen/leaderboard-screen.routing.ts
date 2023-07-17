import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaderboardScreenComponent } from './leaderboard-screen.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderboardScreenComponent,
    title: 'Leaderboard',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class LeaderboardScreenRoutingModule { }
