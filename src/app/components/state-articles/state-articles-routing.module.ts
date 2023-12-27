import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StateArticlesPage } from './state-articles.page';

const routes: Routes = [
  {
    path: '',
    component: StateArticlesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StateArticlesPageRoutingModule {}
