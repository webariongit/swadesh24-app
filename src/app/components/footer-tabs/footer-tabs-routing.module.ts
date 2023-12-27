import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FooterTabsPage } from './footer-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: FooterTabsPage,
    children: [
      {
        path: 'all',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'articles/:id/:value',
        loadChildren: () => import('../articles/articles.module').then( m => m.ArticlesPageModule)
      },
      {
        path: 'shorts',
        loadChildren: () => import('../short-slider/short-slider.module').then( m => m.ShortSliderPageModule)
      },
      {
        path: 'explore',
        loadChildren: () => import('../explore/explore.module').then( m => m.ExplorePageModule)
      },
      {
        path: 'state-articles/:id/:state',
        loadChildren: () => import('../state-articles/state-articles.module').then( m => m.StateArticlesPageModule)
      },
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FooterTabsPageRoutingModule {}
