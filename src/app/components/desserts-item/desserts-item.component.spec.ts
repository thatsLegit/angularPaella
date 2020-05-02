import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertsItemComponent } from './desserts-item.component';

describe('DessertsItemComponent', () => {
  let component: DessertsItemComponent;
  let fixture: ComponentFixture<DessertsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DessertsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DessertsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
