import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowsPageRoutingModule } from './shows-routing.module';

import { ShowsPage } from './shows.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowsPageRoutingModule,
    SharedModule
  ],
  declarations: [ShowsPage]
})
export class ShowsPageModule {}
