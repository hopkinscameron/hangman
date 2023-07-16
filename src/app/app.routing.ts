import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'play', loadChildren: () => import('./game/game.module').then(mod => mod.GameModule) },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(mod => mod.SettingsModule) },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  // TODO: add leaderboards/how to play
  // { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { };
