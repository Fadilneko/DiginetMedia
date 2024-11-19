import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelDetailProdukComponent } from './tabel-detailproduk.component';

describe('TabelDetailProdukComponent', () => {
  let component: TabelDetailProdukComponent;
  let fixture: ComponentFixture<TabelDetailProdukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelDetailProdukComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelDetailProdukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
