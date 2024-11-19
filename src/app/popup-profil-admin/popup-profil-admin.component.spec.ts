import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupProfilAdminComponent } from './popup-profil-admin.component';

describe('PopupProfilAdminComponent', () => {
  let component: PopupProfilAdminComponent;
  let fixture: ComponentFixture<PopupProfilAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupProfilAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupProfilAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
