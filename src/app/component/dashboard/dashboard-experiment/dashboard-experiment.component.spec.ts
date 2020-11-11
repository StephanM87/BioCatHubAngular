import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardExperimentComponent } from './dashboard-experiment.component';

describe('DashboardExperimentComponent', () => {
  let component: DashboardExperimentComponent;
  let fixture: ComponentFixture<DashboardExperimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardExperimentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
