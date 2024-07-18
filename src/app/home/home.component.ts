import { Component } from '@angular/core';
import { AirPollutionService } from '../air-pollution.service';
import * as Highcharts from 'highcharts';
import { AirQualityModalComponent } from '../air-quality-modal/air-quality-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  airPollutionData: any[] = [];
  city: string = '';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {}; // Define chart options here
  forecastData: any[] = [];

  constructor(
    private airPollutionService: AirPollutionService,
    private dialog: MatDialog
  ) {}

  getCurrentdata(): void {
    if (this.city) {
      this.airPollutionService.getCurrentData(this.city).subscribe(
        (data) => (this.airPollutionData = data),
        (error) => console.error('Error fetching data', error)
      );
    }
  }
  getHistoricalData(): void {
    if (this.city) {
      console.log(this.city);
      this.airPollutionService.getHistoricalData(this.city).subscribe(
        (data) => {
          this.airPollutionData = data;
          this.updateChart();
          this.openModal();
          console.log(data);
        },
        (error) => console.error('Error fetching data', error)
      );
    }
  }
  updateChart(): void {
    const historicalSeries = this.mapDataToSeries(
      this.airPollutionData,
      'Historical'
    );
    const forecastSeries = this.mapDataToSeries(this.forecastData, 'Forecast');

    this.chartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Air Pollution Data',
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date',
        },
        labels: {
          formatter: function () {
            return Highcharts.dateFormat('%Y-%m-%d', Number(this.value));
          },
        },
      },
      yAxis: {
        title: {
          text: 'Pollution Level',
        },
      },
      series: [...historicalSeries, ...forecastSeries],
    };
  }
  // generateComment(): string {
  //   const AQI_THRESHOLD = 100;
  //   const PM25_THRESHOLD = 35;
  //   const PM10_THRESHOLD = 50;
  //   const CO_THRESHOLD = 9;
  //   const NO2_THRESHOLD = 53;
  //   const SO2_THRESHOLD = 35;
  //   const O3_THRESHOLD = 70;

  //   const { aqi, pm25, pm10, co, no2, so2, o3 } = this.airPollutionData || {};

  //   if (
  //     aqi > AQI_THRESHOLD ||
  //     pm25 > PM25_THRESHOLD ||
  //     pm10 > PM10_THRESHOLD ||
  //     co > CO_THRESHOLD ||
  //     no2 > NO2_THRESHOLD ||
  //     so2 > SO2_THRESHOLD ||
  //     o3 > O3_THRESHOLD
  //   ) {
  //     return 'Bad air quality. Avoid outdoor activities.';
  //   }
  //   return 'Good air quality. Safe for outdoor activities.';
  // }
  generateComment(): string {
    const AQI_THRESHOLD = 100;
    const PM25_THRESHOLD = 35;
    const PM10_THRESHOLD = 50;
    const CO_THRESHOLD = 9;
    const NO2_THRESHOLD = 53;
    const SO2_THRESHOLD = 35;
    const O3_THRESHOLD = 70;

    let aqi = 0,
      pm25 = 0,
      pm10 = 0,
      co = 0,
      no2 = 0,
      so2 = 0,
      o3 = 0;

    this.airPollutionData.forEach((dataPoint) => {
      aqi += dataPoint.aqi || 0;
      pm25 += dataPoint.pm25 || 0;
      pm10 += dataPoint.pm10 || 0;
      co += dataPoint.co || 0;
      no2 += dataPoint.no2 || 0;
      so2 += dataPoint.so2 || 0;
      o3 += dataPoint.o3 || 0;
    });

    const count = this.airPollutionData.length;
    aqi /= count;
    pm25 /= count;
    pm10 /= count;
    co /= count;
    no2 /= count;
    so2 /= count;
    o3 /= count;

    if (
      aqi > AQI_THRESHOLD ||
      pm25 > PM25_THRESHOLD ||
      pm10 > PM10_THRESHOLD ||
      co > CO_THRESHOLD ||
      no2 > NO2_THRESHOLD ||
      so2 > SO2_THRESHOLD ||
      o3 > O3_THRESHOLD
    ) {
      return 'Bad air quality. Avoid outdoor activities.';
    }
    return 'Good air quality. Safe for outdoor activities.';
  }
  mapDataToSeries(data: any[], type: string): Highcharts.SeriesOptionsType[] {
    return [
      {
        type: 'line',
        name: `${type} AQI`,
        data: data.map((item) => [new Date(item.date).getTime(), item.aqi]),
      },
      {
        type: 'line',
        name: `${type} PM2.5`,
        data: data.map((item) => [new Date(item.date).getTime(), item.pm25]),
      },
      {
        type: 'line',
        name: `${type} PM10`,
        data: data.map((item) => [new Date(item.date).getTime(), item.pm10]),
      },
      {
        type: 'line',
        name: `${type} CO`,
        data: data.map((item) => [new Date(item.date).getTime(), item.co]),
      },
      {
        type: 'line',
        name: `${type} NO2`,
        data: data.map((item) => [new Date(item.date).getTime(), item.no2]),
      },
      {
        type: 'line',
        name: `${type} SO2`,
        data: data.map((item) => [new Date(item.date).getTime(), item.so2]),
      },
      {
        type: 'line',
        name: `${type} O3`,
        data: data.map((item) => [new Date(item.date).getTime(), item.o3]),
      },
    ];
  }

  getForecastData(): void {
    if (this.city) {
      this.airPollutionService.getForecastData(this.city).subscribe(
        (data) => {
          this.forecastData = data;
          this.updateChart();
          this.openModal();
        },
        (error) => console.error('Error fetching data', error)
      );
    }
  }

  openModal(): void {
    this.dialog.open(AirQualityModalComponent, {
      data: { chartOptions: this.chartOptions },
    });
  }
}
