import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterTabsPage } from './footer-tabs.page';

describe('FooterTabsPage', () => {
  let component: FooterTabsPage;
  let fixture: ComponentFixture<FooterTabsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FooterTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
