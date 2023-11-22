import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicTakToePageRoutingModule } from './tic-tak-toe-routing.module';

import { TicTakToePage } from './tic-tak-toe.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicTakToePageRoutingModule,
    SharedModule
  ],
  declarations: [TicTakToePage]
})
export class TicTakToePageModule {}
