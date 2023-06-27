import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HastagsArticlePage } from './hastags-article.page';

const routes: Routes = [
  {
    path: '',
    component: HastagsArticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HastagsArticlePageRoutingModule {}
