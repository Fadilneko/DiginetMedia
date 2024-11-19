import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTambahkelebihanComponent } from './popup-tambahkelebihan.component';

describe('PopupTambahkelebihanComponent', () => {
  let component: PopupTambahkelebihanComponent;
  let fixture: ComponentFixture<PopupTambahkelebihanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTambahkelebihanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupTambahkelebihanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
