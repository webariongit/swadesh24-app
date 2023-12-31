import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FooterTabsPageRoutingModule } from './footer-tabs-routing.module';

import { FooterTabsPage } from './footer-tabs.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterTabsPageRoutingModule,
    SharedModule
  ],
  declarations: [FooterTabsPage]
})
export class FooterTabsPageModule {}
