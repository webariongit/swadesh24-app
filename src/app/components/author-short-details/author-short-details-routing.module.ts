import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorShortDetailsPage } from './author-short-details.page';

const routes: Routes = [
  {
    path: '',
    component: AuthorShortDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorShortDetailsPageRoutingModule {}
