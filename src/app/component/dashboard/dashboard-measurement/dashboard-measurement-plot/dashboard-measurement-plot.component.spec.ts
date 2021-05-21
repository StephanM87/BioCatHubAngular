import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMeasurementPlotComponent } from './dashboard-measurement-plot.component';

describe('DashboardMeasurementPlotComponent', () => {
  let component: DashboardMeasurementPlotComponent;
  let fixture: ComponentFixture<DashboardMeasurementPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMeasurementPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMeasurementPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
