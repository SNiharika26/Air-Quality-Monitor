import { Component, OnInit } from '@angular/core';
import { AirPollutionService } from '../air-pollution.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  airPollutionData: any[] = [];
  city: string = '';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {}; // Define chart options here

  constructor(private airPollutionService: AirPollutionService) { }

  ngOnInit(): void {}

  getHistoricalData(): void {
    if (this.city) {
      this.airPollutionService.getHistoricalData(this.city).subscribe(
        data => {
          this.airPollutionData = data;
          this.initializeChart();
        },
        error => console.error('Error fetching data', error)
      );
    }
  }

  initializeChart(): void {
    this.chartOptions = {
      chart: {
        type: 'line' // Specify the default type for the chart
      },
      title: {
        text: 'Historical Air Pollution Data'
      },
      xAxis: {
        type: 'datetime', // Use 'datetime' for date/time values on x-axis
        title: {
          text: 'Date'
        },
        labels: {
          formatter: function () {
            return Highcharts.dateFormat('%Y-%m-%d', Number(this.value)); // Format labels to show only date
          }
        }
      },
      yAxis: {
        title: {
          text: 'Pollution Level'
        }
      },
      series: [
        {
          type: 'line', // Specify the type for AQI series
          name: 'AQI',
          data: this.airPollutionData.map(item => [new Date(item.date).getTime(), item.aqi]) // Map AQI data
        },
        {
          type: 'line', // Specify the type for PM2.5 series
          name: 'PM2.5',
          data: this.airPollutionData.map(item => [new Date(item.date).getTime(), item.pm25]) // Map PM2.5 data
        },
        {
          type: 'line', // Specify the type for PM10 series
          name: 'PM10',
          data: this.airPollutionData.map(item => [new Date(item.date).getTime(), item.pm10]) // Map PM10 data
        },
        {
          type: 'line', // Specify the type for CO series
          name: 'CO',
          data: this.airPollutionData.map(item => [new Date(item.date).getTime(), item.co]) // Map CO data
        },
        {
          type: 'line', // Specify the type for NO2 series
          name: 'NO2',
          data: this.airPollutionData.map(item => [new Date(item.date).getTime(), item.no2]) // Map NO2 data
        },
        {
          type: 'line', // Specify the type for SO2 series
          name: 'SO2',
          data: this.airPollutionData.map(item => [new Date(item.date).getTime(), item.so2]) // Map SO2 data
        },
        {
          type: 'line', // Specify the type for O3 series
          name: 'O3',
          data: this.airPollutionData.map(item => [new Date(item.date).getTime(), item.o3]) // Map O3 data
        }
      ]
    };
  }
}
