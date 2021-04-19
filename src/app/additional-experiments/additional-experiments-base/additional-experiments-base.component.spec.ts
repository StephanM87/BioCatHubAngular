import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalExperimentsBaseComponent } from './additional-experiments-base.component';

describe('AdditionalexperimentsBaseComponent', () => {
  let component: AdditionalExperimentsBaseComponent;
  let fixture: ComponentFixture<AdditionalExperimentsBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalExperimentsBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalExperimentsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
