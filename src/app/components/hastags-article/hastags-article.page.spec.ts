import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HastagsArticlePage } from './hastags-article.page';

describe('HastagsArticlePage', () => {
  let component: HastagsArticlePage;
  let fixture: ComponentFixture<HastagsArticlePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HastagsArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
