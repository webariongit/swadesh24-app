import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./components/footer-tabs/footer-tabs.module').then( m => m.FooterTabsPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./components/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./components/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'bookmarks',
    loadChildren: () => import('./components/bookmarks/bookmarks.module').then( m => m.BookmarksPageModule)
  },
  {
    path: 'hastags',
    loadChildren: () => import('./components/hastags/hastags.module').then( m => m.HastagsPageModule)
  },
  {
    path: 'stories',
    loadChildren: () => import('./components/stories/stories.module').then( m => m.StoriesPageModule)
  },
  {
    path: 'articles/:value',
    loadChildren: () => import('./components/articles/articles.module').then( m => m.ArticlesPageModule)
  },
  {
    path: 'article-details',
    loadChildren: () => import('./components/article-details/article-details.module').then( m => m.ArticleDetailsPageModule)
  },
  {
    path: 'hastags/:page',
    loadChildren: () => import('./components/hastags-article/hastags-article.module').then( m => m.HastagsArticlePageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./components/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./components/cms/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./components/cms/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'terms-of-use',
    loadChildren: () => import('./components/cms/terms-of-use/terms-of-use.module').then( m => m.TermsOfUsePageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./components/cms/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'author-details',
    loadChildren: () => import('./components/author-details/author-details.module').then( m => m.AuthorDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
