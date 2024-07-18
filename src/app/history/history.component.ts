import { Component, OnInit } from '@angular/core';
import { AirPollutionService } from '../air-pollution.service';
import * as Highcharts from 'highcharts';
import { AirQualityModalComponent } from '../air-quality-modal/air-quality-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  airPollutionData: any[] = [];
  forecastData: any[] = [];
  city: string = '';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {}; // Define chart options here

  constructor(
    private airPollutionService: AirPollutionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

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

  openModal(): void {
    this.dialog.open(AirQualityModalComponent, {
      data: { chartOptions: this.chartOptions },
    });
  }
}
