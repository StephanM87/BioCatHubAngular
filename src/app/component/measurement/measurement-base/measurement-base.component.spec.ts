import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementBaseComponent } from './measurement-base.component';

describe('MeasurementBaseComponent', () => {
  let component: MeasurementBaseComponent;
  let fixture: ComponentFixture<MeasurementBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
