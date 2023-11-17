import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShortsPageRoutingModule } from './shorts-routing.module';

import { ShortsPage } from './shorts.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShortsPageRoutingModule,
    SharedModule
  ],
  declarations: [ShortsPage]
})
export class ShortsPageModule {}
