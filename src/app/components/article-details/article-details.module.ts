import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticleDetailsPageRoutingModule } from './article-details-routing.module';

import { ArticleDetailsPage } from './article-details.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticleDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [ArticleDetailsPage],
})
export class ArticleDetailsPageModule {}
