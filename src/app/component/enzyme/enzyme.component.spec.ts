import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnzymeComponent } from './enzyme.component';

describe('EnzymeComponent', () => {
  let component: EnzymeComponent;
  let fixture: ComponentFixture<EnzymeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnzymeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnzymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
