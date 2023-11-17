import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShortsDetailsPage } from './shorts-details.page';

const routes: Routes = [
  {
    path: '',
    component: ShortsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShortsDetailsPageRoutingModule {}
