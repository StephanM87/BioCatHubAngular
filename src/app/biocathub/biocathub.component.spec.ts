import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BiocathubComponent } from './biocathub.component';

describe('BiocathubComponent', () => {
  let component: BiocathubComponent;
  let fixture: ComponentFixture<BiocathubComponent>;

  beforeEach(waitForAsync(() => {
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
