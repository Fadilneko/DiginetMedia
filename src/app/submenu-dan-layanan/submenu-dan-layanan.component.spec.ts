import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuDanLayananComponent } from './submenu-dan-layanan.component';

describe('SubmenuDanLayananComponent', () => {
  let component: SubmenuDanLayananComponent;
  let fixture: ComponentFixture<SubmenuDanLayananComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmenuDanLayananComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmenuDanLayananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
