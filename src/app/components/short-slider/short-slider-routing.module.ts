import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShortSliderPage } from './short-slider.page';

const routes: Routes = [
  {
    path: '',
    component: ShortSliderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShortSliderPageRoutingModule {}
