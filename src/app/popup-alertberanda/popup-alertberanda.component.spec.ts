import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAlertberandaComponent } from './popup-alertberanda.component';

describe('PopupAlertberandaComponent', () => {
  let component: PopupAlertberandaComponent;
  let fixture: ComponentFixture<PopupAlertberandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAlertberandaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAlertberandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
