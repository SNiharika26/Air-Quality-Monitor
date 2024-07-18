import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAirQualityModalComponent } from './current-air-quality-modal.component';

describe('CurrentAirQualityModalComponent', () => {
  let component: CurrentAirQualityModalComponent;
  let fixture: ComponentFixture<CurrentAirQualityModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentAirQualityModalComponent]
    });
    fixture = TestBed.createComponent(CurrentAirQualityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
