import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionEditorComponent } from './reaction-editor.component';

describe('ReactionEditorComponent', () => {
  let component: ReactionEditorComponent;
  let fixture: ComponentFixture<ReactionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactionEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
