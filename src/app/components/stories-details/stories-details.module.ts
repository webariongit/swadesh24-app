import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoriesDetailsPageRoutingModule } from './stories-details-routing.module';

import { StoriesDetailsPage } from './stories-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoriesDetailsPageRoutingModule
  ],
  declarations: [StoriesDetailsPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class StoriesDetailsPageModule {}
