import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NewsBoxComponent } from './news-box/news-box.component';
import { LikeBtnComponent } from './action-btns/like-btn/like-btn.component';
import { CommentBtnComponent } from './action-btns/comment-btn/comment-btn.component';
import { SaveBtnComponent } from './action-btns/save-btn/save-btn.component';
import { TrendingTopicsComponent } from './trending-topics/trending-topics.component';
import { NewsListBoxComponent } from './news-list-box/news-list-box.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NewsBoxComponent,
    LikeBtnComponent,
    CommentBtnComponent,
    SaveBtnComponent,
    TrendingTopicsComponent,
    NewsListBoxComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    HeaderComponent,
    NewsBoxComponent,
    LikeBtnComponent,
    CommentBtnComponent,
    SaveBtnComponent,
    TrendingTopicsComponent,
    NewsListBoxComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class SharedModule { }
