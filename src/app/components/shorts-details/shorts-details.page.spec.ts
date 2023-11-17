import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShortsDetailsPage } from './shorts-details.page';

describe('ShortsDetailsPage', () => {
  let component: ShortsDetailsPage;
  let fixture: ComponentFixture<ShortsDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShortsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
