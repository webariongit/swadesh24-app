import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteMyAccountPage } from './delete-my-account.page';

describe('DeleteMyAccountPage', () => {
  let component: DeleteMyAccountPage;
  let fixture: ComponentFixture<DeleteMyAccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeleteMyAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
