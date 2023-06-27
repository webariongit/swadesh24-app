import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthorDetailsPageRoutingModule } from './author-details-routing.module';

import { AuthorDetailsPage } from './author-details.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthorDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [AuthorDetailsPage]
})
export class AuthorDetailsPageModule {}
