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
  

  constructor(private airPollutionService: AirPollutionService) { }

  ngOnInit(): void {}
  getHistoricalData(): void {
    if (this.city ) {
      this.airPollutionService.getHistoricalData(this.city).subscribe(
        data => this.airPollutionData = data,
        error => console.error('Error fetching data', error)
      );
    }
  }

}
