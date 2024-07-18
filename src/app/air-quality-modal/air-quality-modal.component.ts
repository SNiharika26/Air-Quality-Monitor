import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-air-quality-modal',
  templateUrl: './air-quality-modal.component.html',
  styleUrls: ['./air-quality-modal.component.scss'],
})
export class AirQualityModalComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.chartOptions = data.chartOptions;
  }
}
