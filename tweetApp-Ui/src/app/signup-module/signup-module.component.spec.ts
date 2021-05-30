import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupModuleComponent } from './signup-module.component';

describe('SignupModuleComponent', () => {
  let component: SignupModuleComponent;
  let fixture: ComponentFixture<SignupModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
