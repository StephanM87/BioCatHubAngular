import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComboComponent } from './input-combo.component';

describe('InputComboComponent', () => {
  let component: InputComboComponent;
  let fixture: ComponentFixture<InputComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComboComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
