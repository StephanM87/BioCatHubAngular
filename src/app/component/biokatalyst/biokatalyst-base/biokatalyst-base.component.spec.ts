import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiokatalystBaseComponent } from './biokatalyst-base.component';

describe('BiokatalystBaseComponent', () => {
  let component: BiokatalystBaseComponent;
  let fixture: ComponentFixture<BiokatalystBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiokatalystBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiokatalystBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
