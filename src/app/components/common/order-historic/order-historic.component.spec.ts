import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoricComponent } from './order-historic.component';

describe('OrderHistoricComponent', () => {
  let component: OrderHistoricComponent;
  let fixture: ComponentFixture<OrderHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
