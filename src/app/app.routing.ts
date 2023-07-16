import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'play', loadChildren: () => import('./game/game.module').then(mod => mod.GameModule) },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  // TODO: add settings/leaderboards
  // { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { };
