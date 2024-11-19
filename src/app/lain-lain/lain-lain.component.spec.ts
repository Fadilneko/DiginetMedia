import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LainLainComponent } from './lain-lain.component';

describe('LainLainComponent', () => {
  let component: LainLainComponent;
  let fixture: ComponentFixture<LainLainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LainLainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LainLainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
