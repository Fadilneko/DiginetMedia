import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GisInvestasiComponent } from './gis-investasi.component';

describe('GisInvestasiComponent', () => {
  let component: GisInvestasiComponent;
  let fixture: ComponentFixture<GisInvestasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GisInvestasiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GisInvestasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
