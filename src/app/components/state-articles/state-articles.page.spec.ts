import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StateArticlesPage } from './state-articles.page';

describe('StateArticlesPage', () => {
  let component: StateArticlesPage;
  let fixture: ComponentFixture<StateArticlesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StateArticlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
