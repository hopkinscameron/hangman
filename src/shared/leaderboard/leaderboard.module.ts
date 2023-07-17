import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/shared/material/material.module';
import { CloseModule } from 'src/shared/close/close.module';
import { PageBodyModule } from 'src/shared/page-body/page-body.module';
import { LeaderboardComponent } from './leaderboard.component';

@NgModule({
  declarations: [
    LeaderboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    CloseModule,
    PageBodyModule,
  ],
  exports: [
    LeaderboardComponent,
  ],
})
export class LeaderboardModule { }
