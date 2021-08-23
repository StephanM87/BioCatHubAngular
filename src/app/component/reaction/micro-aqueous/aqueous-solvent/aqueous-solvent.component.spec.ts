import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqueousSolventComponent } from './aqueous-solvent.component';

describe('AqueousSolventComponent', () => {
  let component: AqueousSolventComponent;
  let fixture: ComponentFixture<AqueousSolventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AqueousSolventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AqueousSolventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
