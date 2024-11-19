import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTambahkeunggulanprodukComponent } from './popup-tambahkeunggulanproduk.component';

describe('PopupTambahkeunggulanprodukComponent', () => {
  let component: PopupTambahkeunggulanprodukComponent;
  let fixture: ComponentFixture<PopupTambahkeunggulanprodukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTambahkeunggulanprodukComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupTambahkeunggulanprodukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
