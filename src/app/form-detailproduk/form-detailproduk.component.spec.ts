import { ComponentFixture, TestBed } from '@angular/core/testing';

import {FormDetailProdukComponent } from './form-detailproduk.component';

describe('FormDetailProdukComponent', () => {
  let component: FormDetailProdukComponent;
  let fixture: ComponentFixture<FormDetailProdukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDetailProdukComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDetailProdukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
