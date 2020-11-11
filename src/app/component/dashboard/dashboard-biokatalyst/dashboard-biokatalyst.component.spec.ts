import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBiokatalystComponent } from './dashboard-biokatalyst.component';

describe('DashboardBiokatalystComponent', () => {
  let component: DashboardBiokatalystComponent;
  let fixture: ComponentFixture<DashboardBiokatalystComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardBiokatalystComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBiokatalystComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
