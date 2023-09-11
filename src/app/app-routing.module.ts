import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from './service/auth-gaurd/auth-gaurd.service';
import { LoginGaurdService } from './service/login-page/login-gaurd.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./components/footer-tabs/footer-tabs.module').then( m => m.FooterTabsPageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'my-profile/:mode',
    loadChildren: () => import('./components/my-profile/my-profile.module').then( m => m.MyProfilePageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'settings',
    loadChildren: () => import('./components/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'bookmarks',
    loadChildren: () => import('./components/bookmarks/bookmarks.module').then( m => m.BookmarksPageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'hastags',
    loadChildren: () => import('./components/hastags/hastags.module').then( m => m.HastagsPageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'stories',
    loadChildren: () => import('./components/stories/stories.module').then( m => m.StoriesPageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'article-details/:id',
    loadChildren: () => import('./components/article-details/article-details.module').then( m => m.ArticleDetailsPageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'hastags/:id',
    loadChildren: () => import('./components/hastags-article/hastags-article.module').then( m => m.HastagsArticlePageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'feedback',
    loadChildren: () => import('./components/feedback/feedback.module').then( m => m.FeedbackPageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'about-us',
    loadChildren: () => import('./components/cms/about-us/about-us.module').then( m => m.AboutUsPageModule),
    canActivate: [AuthGaurdService],
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
    loadChildren: () => import('./components/cms/contact-us/contact-us.module').then( m => m.ContactUsPageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule),
    canActivate:[LoginGaurdService]
  },
  {
    path: 'author-details/:id',
    loadChildren: () => import('./components/author-details/author-details.module').then( m => m.AuthorDetailsPageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'search',
    loadChildren: () => import('./components/search/search.module').then( m => m.SearchPageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'stories-details/:id',
    loadChildren: () => import('./components/stories-details/stories-details.module').then( m => m.StoriesDetailsPageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'delete-my-account',
    loadChildren: () => import('./components/delete-my-account/delete-my-account.module').then( m => m.DeleteMyAccountPageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: '',
    loadChildren: () => import('./components/splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'personal-information/:id',
    loadChildren: () => import('./components/personal-information/personal-information.module').then( m => m.PersonalInformationPageModule)
  },
  {
    path: 'country-list',
    loadChildren: () => import('./components/country-list/country-list.module').then( m => m.CountryListPageModule)
  },
  {
    path: 'state-list',
    loadChildren: () => import('./components/state-list/state-list.module').then( m => m.StateListPageModule)
  },
  // {
  //   path: 'delete-my-account',
  //   loadChildren: () => import('./components/delete-my-account/delete-my-account.module').then( m => m.DeleteMyAccountPageModule),
  //   canActivate: [AuthGaurdService],
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
