import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalExperimentsDetailComponent } from './additional-experiments-detail.component';

describe('AdditionalExperimentsDetailComponent', () => {
  let component: AdditionalExperimentsDetailComponent;
  let fixture: ComponentFixture<AdditionalExperimentsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalExperimentsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalExperimentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
