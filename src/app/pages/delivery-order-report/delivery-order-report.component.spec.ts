import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderReportComponent } from './delivery-order-report.component';

describe('DeliveryOrderReportComponent', () => {
  let component: DeliveryOrderReportComponent;
  let fixture: ComponentFixture<DeliveryOrderReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryOrderReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryOrderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
