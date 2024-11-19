import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTambahfiturprodukComponent } from './popup-tambahfiturproduk.component';

describe('PopupTambahfiturprodukComponent', () => {
  let component: PopupTambahfiturprodukComponent;
  let fixture: ComponentFixture<PopupTambahfiturprodukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTambahfiturprodukComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupTambahfiturprodukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
