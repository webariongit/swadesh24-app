import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorShortDetailsPage } from './author-short-details.page';

describe('AuthorShortDetailsPage', () => {
  let component: AuthorShortDetailsPage;
  let fixture: ComponentFixture<AuthorShortDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AuthorShortDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
