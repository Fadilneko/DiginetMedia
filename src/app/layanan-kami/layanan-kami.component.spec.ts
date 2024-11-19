import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayananKamiComponent } from './layanan-kami.component';

describe('LayananKamiComponent', () => {
  let component: LayananKamiComponent;
  let fixture: ComponentFixture<LayananKamiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayananKamiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayananKamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
