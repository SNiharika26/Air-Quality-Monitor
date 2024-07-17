import { Component } from '@angular/core';
import { AirPollutionService } from '../air-pollution.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  airPollutionData: any = null;
  city: string = '';

  constructor(private airPollutionService: AirPollutionService) {}

  getCurrentdata(): void {
    if (this.city) {
      this.airPollutionService.getCurrentData(this.city).subscribe(
        data => this.airPollutionData = data,
        error => console.error('Error fetching data', error)
      );
    }
  }

  generateComment(): string {
    const AQI_THRESHOLD = 100;
    const PM25_THRESHOLD = 35;
    const PM10_THRESHOLD = 50;
    const CO_THRESHOLD = 9;
    const NO2_THRESHOLD = 53;
    const SO2_THRESHOLD = 35;
    const O3_THRESHOLD = 70;

    const { aqi, pm25, pm10, co, no2, so2, o3 } = this.airPollutionData || {};

    if (aqi > AQI_THRESHOLD || pm25 > PM25_THRESHOLD || pm10 > PM10_THRESHOLD || co > CO_THRESHOLD || no2 > NO2_THRESHOLD || so2 > SO2_THRESHOLD || o3 > O3_THRESHOLD) {
      return 'Bad air quality. Avoid outdoor activities.';
    }
    return 'Good air quality. Safe for outdoor activities.';
  }
}
