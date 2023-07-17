import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GameActivateGuard } from './game-activate.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'play',
    loadChildren: () => import('./game/game.module').then(mod => mod.GameModule),
    canActivate: [GameActivateGuard],
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings-screen/settings-screen.module').then(mod => mod.SettingsScreenModule),
    canActivate: [GameActivateGuard],
  },
  {
    path: 'how-to-play',
    loadChildren: () => import('./how-to-play/how-to-play.module').then(mod => mod.HowToPlayModule),
    canActivate: [GameActivateGuard],
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  // TODO: add leaderboards/how to play
  // { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { };
