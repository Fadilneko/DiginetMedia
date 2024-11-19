import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupBerandaComponent } from './popup-beranda.component';

describe('PopupBerandaComponent', () => {
  let component: PopupBerandaComponent;
  let fixture: ComponentFixture<PopupBerandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupBerandaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupBerandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
