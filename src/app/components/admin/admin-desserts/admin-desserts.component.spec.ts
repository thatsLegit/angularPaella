import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDessertsComponent } from './admin-desserts.component';

describe('AdminDessertsComponent', () => {
  let component: AdminDessertsComponent;
  let fixture: ComponentFixture<AdminDessertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDessertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDessertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
