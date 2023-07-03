import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoriesDetailsPage } from './stories-details.page';

const routes: Routes = [
  {
    path: '',
    component: StoriesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoriesDetailsPageRoutingModule {}
