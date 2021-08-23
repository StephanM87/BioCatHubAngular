import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganicSolventComponent } from './organic-solvent.component';

describe('OrganicSolventComponent', () => {
  let component: OrganicSolventComponent;
  let fixture: ComponentFixture<OrganicSolventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganicSolventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicSolventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
