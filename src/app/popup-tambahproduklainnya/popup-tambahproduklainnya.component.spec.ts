import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTambahproduklainnyaComponent } from './popup-tambahproduklainnya.component';

describe('PopupTambahproduklainnyaComponent', () => {
  let component: PopupTambahproduklainnyaComponent;
  let fixture: ComponentFixture<PopupTambahproduklainnyaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTambahproduklainnyaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupTambahproduklainnyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
