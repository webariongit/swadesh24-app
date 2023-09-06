import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StateListPage } from './state-list.page';

describe('StateListPage', () => {
  let component: StateListPage;
  let fixture: ComponentFixture<StateListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StateListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
