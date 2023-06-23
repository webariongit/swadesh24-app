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
