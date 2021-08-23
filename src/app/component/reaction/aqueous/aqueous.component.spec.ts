import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqueousComponent } from './aqueous.component';

describe('AqueousComponent', () => {
  let component: AqueousComponent;
  let fixture: ComponentFixture<AqueousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AqueousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AqueousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
