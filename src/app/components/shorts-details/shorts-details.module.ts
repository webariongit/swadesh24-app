import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShortsDetailsPageRoutingModule } from './shorts-details-routing.module';

import { ShortsDetailsPage } from './shorts-details.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShortsDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [ShortsDetailsPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class ShortsDetailsPageModule {}
