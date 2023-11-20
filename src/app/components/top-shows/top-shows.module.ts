import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopShowsPageRoutingModule } from './top-shows-routing.module';

import { TopShowsPage } from './top-shows.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopShowsPageRoutingModule
  ],
  declarations: [TopShowsPage]
})
export class TopShowsPageModule {}
