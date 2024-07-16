import { Component, OnInit } from '@angular/core';
import { AirPollutionService } from '../air-pollution.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  airPollutionData: any[] = [];
  city: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(private airPollutionService: AirPollutionService) { }

  ngOnInit(): void {}
  getHistoricalData(): void {
    if (this.city && this.startDate && this.endDate) {
      this.airPollutionService.getHistoricalData(this.city, this.startDate, this.endDate).subscribe(
        data => this.airPollutionData = data,
        error => console.error('Error fetching data', error)
      );
    }
  }

}
