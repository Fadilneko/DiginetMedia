import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ELayananComponent } from './e-layanan.component';

describe('ELayananComponent', () => {
  let component: ELayananComponent;
  let fixture: ComponentFixture<ELayananComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ELayananComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ELayananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
