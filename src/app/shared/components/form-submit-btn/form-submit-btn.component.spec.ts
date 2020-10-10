import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmitBtnComponent } from './form-submit-btn.component';

describe('FormSubmitBtnComponent', () => {
  let component: FormSubmitBtnComponent;
  let fixture: ComponentFixture<FormSubmitBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSubmitBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSubmitBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
