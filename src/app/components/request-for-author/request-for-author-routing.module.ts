import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestForAuthorPage } from './request-for-author.page';

const routes: Routes = [
  {
    path: '',
    component: RequestForAuthorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestForAuthorPageRoutingModule {}
