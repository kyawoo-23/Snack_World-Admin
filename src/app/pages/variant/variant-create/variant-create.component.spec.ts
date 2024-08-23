import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantCreateComponent } from './variant-create.component';

describe('VariantCreateComponent', () => {
  let component: VariantCreateComponent;
  let fixture: ComponentFixture<VariantCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariantCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
