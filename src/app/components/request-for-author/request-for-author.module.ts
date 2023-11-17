import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestForAuthorPageRoutingModule } from './request-for-author-routing.module';

import { RequestForAuthorPage } from './request-for-author.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestForAuthorPageRoutingModule
  ],
  declarations: [RequestForAuthorPage]
})
export class RequestForAuthorPageModule {}
