import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroAqueousComponent } from './micro-aqueous.component';

describe('MicroAqueousComponent', () => {
  let component: MicroAqueousComponent;
  let fixture: ComponentFixture<MicroAqueousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroAqueousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroAqueousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
