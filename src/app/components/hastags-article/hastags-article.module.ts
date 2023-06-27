import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HastagsArticlePageRoutingModule } from './hastags-article-routing.module';

import { HastagsArticlePage } from './hastags-article.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HastagsArticlePageRoutingModule,
    SharedModule
  ],
  declarations: [HastagsArticlePage]
})
export class HastagsArticlePageModule {}
