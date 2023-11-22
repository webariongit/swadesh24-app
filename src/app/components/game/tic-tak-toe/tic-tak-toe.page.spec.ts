import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicTakToePage } from './tic-tak-toe.page';

describe('TicTakToePage', () => {
  let component: TicTakToePage;
  let fixture: ComponentFixture<TicTakToePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TicTakToePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
