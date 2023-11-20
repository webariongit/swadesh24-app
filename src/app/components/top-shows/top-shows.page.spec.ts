import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopShowsPage } from './top-shows.page';

describe('TopShowsPage', () => {
  let component: TopShowsPage;
  let fixture: ComponentFixture<TopShowsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TopShowsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
