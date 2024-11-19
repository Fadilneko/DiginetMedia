import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentitaskantorComponent } from './identitaskantor.component';

describe('IdentitaskantorComponent', () => {
  let component: IdentitaskantorComponent;
  let fixture: ComponentFixture<IdentitaskantorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentitaskantorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentitaskantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
