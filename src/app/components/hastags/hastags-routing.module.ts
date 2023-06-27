import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HastagsPage } from './hastags.page';

const routes: Routes = [
  {
    path: '',
    component: HastagsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HastagsPageRoutingModule {}
