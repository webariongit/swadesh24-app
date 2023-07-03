import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoriesDetailsPage } from './stories-details.page';

describe('StoriesDetailsPage', () => {
  let component: StoriesDetailsPage;
  let fixture: ComponentFixture<StoriesDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StoriesDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
