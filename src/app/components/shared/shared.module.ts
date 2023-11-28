import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NewsBoxComponent } from './news-box/news-box.component';
import { LikeBtnComponent } from './action-btns/like-btn/like-btn.component';
import { CommentBtnComponent } from './action-btns/comment-btn/comment-btn.component';
import { SaveBtnComponent } from './action-btns/save-btn/save-btn.component';
import { TrendingTopicsComponent } from './trending-topics/trending-topics.component';
import { NewsListBoxComponent } from './news-list-box/news-list-box.component';
import { StoriesBoxComponent } from './stories-box/stories-box.component';
import { EntertainmentBoxComponent } from './entertainment-box/entertainment-box.component';
import { ArticlesBoxComponent } from './articles-box/articles-box.component';
import { ShareBtnComponent } from './action-btns/share-btn/share-btn.component';
import { CommentComponent } from './comment/comment.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdsBoxComponent } from './ads-box/ads-box.component';
import { ShortsBoxComponent } from './shorts-box/shorts-box.component';
import { TeamBoxComponent } from './team-box/team-box.component';
import { TopShowsBoxComponent } from './top-shows-box/top-shows-box.component';
import { PollsBoxComponent } from './polls-box/polls-box.component';
import { ShowsListComponent } from './shows-list/shows-list.component';
import { NumberFormatePipe } from 'src/app/pipe/number-formate-pipe/number-formate.pipe';
import { SquareComponent } from './square/square.component';
import { ShortDetailsComponent } from './short-details/short-details.component';

@NgModule({
  declarations: [
    NumberFormatePipe,
    HeaderComponent,
    NewsBoxComponent,
    LikeBtnComponent,
    CommentBtnComponent,
    SaveBtnComponent,
    TrendingTopicsComponent,
    NewsListBoxComponent,
    StoriesBoxComponent,
    EntertainmentBoxComponent,
    ArticlesBoxComponent,
    ShareBtnComponent,
    CommentComponent,
    AdsBoxComponent,
    ShortsBoxComponent,
    TeamBoxComponent,
    TopShowsBoxComponent,
    PollsBoxComponent,
    ShowsListComponent,
    SquareComponent,
    ShortDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports:[
    HeaderComponent,
    NewsBoxComponent,
    LikeBtnComponent,
    CommentBtnComponent,
    SaveBtnComponent,
    TrendingTopicsComponent,
    NewsListBoxComponent,
    StoriesBoxComponent,
    EntertainmentBoxComponent,
    ArticlesBoxComponent,
    ShareBtnComponent,
    AdsBoxComponent,
    ShortsBoxComponent,
    TeamBoxComponent,
    TopShowsBoxComponent,
    PollsBoxComponent,
    ShowsListComponent,
    NumberFormatePipe,
    SquareComponent,
    ShortDetailsComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class SharedModule { }
