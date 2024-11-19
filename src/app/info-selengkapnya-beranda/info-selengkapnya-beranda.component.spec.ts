import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSelengkapnyaBerandaComponent } from './info-selengkapnya-beranda.component';

describe('InfoSelengkapnyaBerandaComponent', () => {
  let component: InfoSelengkapnyaBerandaComponent;
  let fixture: ComponentFixture<InfoSelengkapnyaBerandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSelengkapnyaBerandaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoSelengkapnyaBerandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
