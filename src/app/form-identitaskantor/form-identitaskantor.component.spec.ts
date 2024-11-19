import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIdentitaskantorComponent } from './form-identitaskantor.component';

describe('FormIdentitaskantorComponent', () => {
  let component: FormIdentitaskantorComponent;
  let fixture: ComponentFixture<FormIdentitaskantorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIdentitaskantorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormIdentitaskantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
