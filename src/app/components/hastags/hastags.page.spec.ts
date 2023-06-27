import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HastagsPage } from './hastags.page';

describe('HastagsPage', () => {
  let component: HastagsPage;
  let fixture: ComponentFixture<HastagsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HastagsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
