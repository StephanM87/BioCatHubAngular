import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiocathubComponent } from './biocathub.component';

describe('BiocathubComponent', () => {
  let component: BiocathubComponent;
  let fixture: ComponentFixture<BiocathubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiocathubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiocathubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
