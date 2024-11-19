import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTableLainLainComponent } from './popup-table-lain-lain.component';

describe('PopupTableLainLainComponent', () => {
  let component: PopupTableLainLainComponent;
  let fixture: ComponentFixture<PopupTableLainLainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTableLainLainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupTableLainLainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
