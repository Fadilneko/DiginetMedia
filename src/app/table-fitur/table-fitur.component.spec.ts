import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFiturComponent } from './table-fitur.component';

describe('TableFiturComponent', () => {
  let component: TableFiturComponent;
  let fixture: ComponentFixture<TableFiturComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFiturComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableFiturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
