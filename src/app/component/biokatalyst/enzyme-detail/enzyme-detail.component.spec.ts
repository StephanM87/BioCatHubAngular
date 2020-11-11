import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnzymeDetailComponent } from './enzyme-detail.component';

describe('EnzymeDetailComponent', () => {
  let component: EnzymeDetailComponent;
  let fixture: ComponentFixture<EnzymeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnzymeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnzymeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
