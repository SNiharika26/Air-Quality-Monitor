import { Component } from '@angular/core';
import { AirPollutionService } from '../air-pollution.service';
import * as Highcharts from 'highcharts';
import { AirQualityModalComponent } from '../air-quality-modal/air-quality-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CurrentAirQualityModalComponent } from '../current-air-quality-modal/current-air-quality-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  currentAirPollutionData: any[] = [];
  airPollutionData: any[] = [];
  forecastData: any[] = [];
  currentCity: string = '';
  historicCity: string = '';
  forecastCity: string = '';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {}; // Define chart options here
  historicalChartOptions: Highcharts.Options = {}; // Define historical chart options
  forecastChartOptions: Highcharts.Options = {}; // Define forecast chart options

  constructor(
    private airPollutionService: AirPollutionService,
    private dialog: MatDialog
  ) {}

  getCurrentData(): void {
    if (this.currentCity) {
      this.airPollutionService.getCurrentData(this.currentCity).subscribe(
        (data) => {
          this.currentAirPollutionData = data;
          this.openCurrentModal(); // Open the modal after data is fetched
        },
        (error) => console.error('Error fetching current data', error)
      );
    }
  }

  getHistoricalData(): void {
    if (this.historicCity) {
      this.airPollutionService.getHistoricalData(this.historicCity).subscribe(
        (data) => {
          this.airPollutionData = data;
          this.updateHistoricalChart(); // Call the update function for historical chart
          this.openModal(this.historicalChartOptions);
        },
        (error) => console.error('Error fetching historical data', error)
      );
    }
  }

  getForecastData(): void {
    if (this.forecastCity) {
      this.airPollutionService.getForecastData(this.forecastCity).subscribe(
        (data) => {
          this.forecastData = data;
          this.updateForecastChart(); // Call the update function for forecast chart
          this.openModal(this.forecastChartOptions);
        },
        (error) => console.error('Error fetching forecast data', error)
      );
    }
  }

  updateHistoricalChart(): void {
    const historicalSeries = this.mapDataToSeries(
      this.airPollutionData,
      'Historical'
    );

    this.historicalChartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Historical Air Pollution Data',
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
      series: historicalSeries,
    };
  }

  updateForecastChart(): void {
    const forecastSeries = this.mapDataToSeries(this.forecastData, 'Forecast');

    this.forecastChartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Forecasted Air Pollution Data',
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
      series: forecastSeries,
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


  // openModal(chartOptions: Highcharts.Options): void {
  //   this.dialog.open(AirQualityModalComponent, {
  //     data: { chartOptions },
  //   });
  // }
  openModal(chartOptions: Highcharts.Options): void {
    document.body.classList.add('modal-open');
    const dialogRef = this.dialog.open(AirQualityModalComponent, {
      data: { chartOptions },
      disableClose: true, // Prevent closing the modal by clicking outside
      width: '80vw', // Adjust width as needed
      height: 'auto', // Adjust height as needed
      maxWidth: '90vw', // Ensure the modal doesn't exceed viewport width
    });
    dialogRef.afterClosed().subscribe(() => {
      document.body.classList.remove('modal-open');
    });
  }
  openCurrentModal(): void {
    this.dialog.open(CurrentAirQualityModalComponent, {
      data: { currentAirPollutionData: this.currentAirPollutionData },
    });
  }
}
