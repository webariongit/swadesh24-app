import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShortSliderPageRoutingModule } from './short-slider-routing.module';

import { ShortSliderPage } from './short-slider.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShortSliderPageRoutingModule,
    SharedModule
  ],
  declarations: [ShortSliderPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ShortSliderPageModule {}
