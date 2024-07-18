import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirQualityModalComponent } from './air-quality-modal.component';

describe('AirQualityModalComponent', () => {
  let component: AirQualityModalComponent;
  let fixture: ComponentFixture<AirQualityModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AirQualityModalComponent]
    });
    fixture = TestBed.createComponent(AirQualityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
