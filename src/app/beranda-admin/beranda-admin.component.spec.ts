import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BerandaAdminComponent } from './beranda-admin.component';

describe('BerandaAdminComponent', () => {
  let component: BerandaAdminComponent;
  let fixture: ComponentFixture<BerandaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BerandaAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BerandaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
