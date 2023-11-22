import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicTakToePage } from './tic-tak-toe.page';

const routes: Routes = [
  {
    path: '',
    component: TicTakToePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicTakToePageRoutingModule {}
