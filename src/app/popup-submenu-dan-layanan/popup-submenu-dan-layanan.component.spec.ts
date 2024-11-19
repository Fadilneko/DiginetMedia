import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSubmenuDanLayananComponent } from './popup-submenu-dan-layanan.component';

describe('PopupSubmenuDanLayananComponent', () => {
  let component: PopupSubmenuDanLayananComponent;
  let fixture: ComponentFixture<PopupSubmenuDanLayananComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupSubmenuDanLayananComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupSubmenuDanLayananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
