import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoriesPageRoutingModule } from './stories-routing.module';

import { StoriesPage } from './stories.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoriesPageRoutingModule,
    SharedModule
  ],
  declarations: [StoriesPage]
})
export class StoriesPageModule {}
