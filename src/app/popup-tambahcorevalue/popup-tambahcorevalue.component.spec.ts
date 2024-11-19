import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTambahcorevalueComponent } from './popup-tambahcorevalue.component';

describe('PopupTambahcorevalueComponent', () => {
  let component: PopupTambahcorevalueComponent;
  let fixture: ComponentFixture<PopupTambahcorevalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTambahcorevalueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupTambahcorevalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
