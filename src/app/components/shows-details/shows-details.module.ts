import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowsDetailsPageRoutingModule } from './shows-details-routing.module';

import { ShowsDetailsPage } from './shows-details.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowsDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [ShowsDetailsPage]
})
export class ShowsDetailsPageModule {}
