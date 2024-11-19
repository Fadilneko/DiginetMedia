import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGisComponent } from './detail-gis.component';

describe('DetailGisComponent', () => {
  let component: DetailGisComponent;
  let fixture: ComponentFixture<DetailGisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailGisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailGisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
