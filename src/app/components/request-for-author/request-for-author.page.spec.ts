import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestForAuthorPage } from './request-for-author.page';

describe('RequestForAuthorPage', () => {
  let component: RequestForAuthorPage;
  let fixture: ComponentFixture<RequestForAuthorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RequestForAuthorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
