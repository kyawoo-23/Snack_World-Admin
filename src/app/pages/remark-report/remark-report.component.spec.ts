import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkReportComponent } from './remark-report.component';

describe('RemarkReportComponent', () => {
  let component: RemarkReportComponent;
  let fixture: ComponentFixture<RemarkReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemarkReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemarkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
