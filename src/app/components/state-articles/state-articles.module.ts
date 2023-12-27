import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StateArticlesPageRoutingModule } from './state-articles-routing.module';

import { StateArticlesPage } from './state-articles.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StateArticlesPageRoutingModule,
    SharedModule
  ],
  declarations: [StateArticlesPage]
})
export class StateArticlesPageModule {}
