import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShortSliderPage } from './short-slider.page';

describe('ShortSliderPage', () => {
  let component: ShortSliderPage;
  let fixture: ComponentFixture<ShortSliderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShortSliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
