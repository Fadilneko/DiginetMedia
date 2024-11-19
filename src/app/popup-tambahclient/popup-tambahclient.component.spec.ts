import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopuptambahClientComponent } from './popup-tambahclient.component';

describe('PopupTambahclientComponent', () => {
  let component: PopuptambahClientComponent;
  let fixture: ComponentFixture<PopuptambahClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopuptambahClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopuptambahClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
