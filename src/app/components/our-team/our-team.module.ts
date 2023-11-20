import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurTeamPageRoutingModule } from './our-team-routing.module';

import { OurTeamPage } from './our-team.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OurTeamPageRoutingModule,
    SharedModule
  ],
  declarations: [OurTeamPage]
})
export class OurTeamPageModule {}
