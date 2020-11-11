import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVesselComponent } from './dashboard-vessel.component';

describe('DashboardVesselComponent', () => {
  let component: DashboardVesselComponent;
  let fixture: ComponentFixture<DashboardVesselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardVesselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVesselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
