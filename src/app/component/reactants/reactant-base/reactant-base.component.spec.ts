import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactantBaseComponent } from './reactant-base.component';

describe('ReactantBaseComponent', () => {
  let component: ReactantBaseComponent;
  let fixture: ComponentFixture<ReactantBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactantBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactantBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
