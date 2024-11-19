import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHubungikamiComponent } from './table-hubungikami.component';

describe('TableHubungikamiComponent', () => {
  let component: TableHubungikamiComponent;
  let fixture: ComponentFixture<TableHubungikamiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableHubungikamiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableHubungikamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
