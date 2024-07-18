import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-current-air-quality-modal',
  templateUrl: './current-air-quality-modal.component.html',
  styleUrls: ['./current-air-quality-modal.component.scss']
})
export class CurrentAirQualityModalComponent {
  currentAirPollutionData: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentAirPollutionData = data.currentAirPollutionData;
  }
  generateComment(data: {
    aqi: number;
    pm25: number;
    pm10: number;
    co: number;
    no2: number;
    so2: number;
    o3: number;
  }): string {
    const AQI_THRESHOLD = 100;
    const PM25_THRESHOLD = 35;
    const PM10_THRESHOLD = 50;
    const CO_THRESHOLD = 9;
    const NO2_THRESHOLD = 53;
    const SO2_THRESHOLD = 35;
    const O3_THRESHOLD = 70;

    if (
      data.aqi > AQI_THRESHOLD ||
      data.pm25 > PM25_THRESHOLD ||
      data.pm10 > PM10_THRESHOLD ||
      data.co > CO_THRESHOLD ||
      data.no2 > NO2_THRESHOLD ||
      data.so2 > SO2_THRESHOLD ||
      data.o3 > O3_THRESHOLD
    ) {
      return 'Bad air quality. Avoid outdoor activities.';
    }
    return 'Good air quality. Safe for outdoor activities.';
  }

}
