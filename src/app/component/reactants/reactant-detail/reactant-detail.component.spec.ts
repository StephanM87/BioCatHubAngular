import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactantDetailComponent } from './reactant-detail.component';

describe('ReactantDetailComponent', () => {
  let component: ReactantDetailComponent;
  let fixture: ComponentFixture<ReactantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactantDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
