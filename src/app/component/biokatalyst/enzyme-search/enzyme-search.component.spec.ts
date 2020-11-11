import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnzymeSearchComponent } from './enzyme-search.component';

describe('EnzymeSearchComponent', () => {
  let component: EnzymeSearchComponent;
  let fixture: ComponentFixture<EnzymeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnzymeSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnzymeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
