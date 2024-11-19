import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLainLainComponent } from './table-lain-lain.component';

describe('TableLainLainComponent', () => {
  let component: TableLainLainComponent;
  let fixture: ComponentFixture<TableLainLainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableLainLainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableLainLainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
