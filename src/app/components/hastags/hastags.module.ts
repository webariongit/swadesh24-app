import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HastagsPageRoutingModule } from './hastags-routing.module';

import { HastagsPage } from './hastags.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HastagsPageRoutingModule
  ],
  declarations: [HastagsPage]
})
export class HastagsPageModule {}
