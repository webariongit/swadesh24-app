import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthorShortDetailsPageRoutingModule } from './author-short-details-routing.module';

import { AuthorShortDetailsPage } from './author-short-details.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthorShortDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [AuthorShortDetailsPage]
})
export class AuthorShortDetailsPageModule {}
