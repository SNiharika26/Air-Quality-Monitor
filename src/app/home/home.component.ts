import { Component } from '@angular/core';
import { AirPollutionService } from '../air-pollution.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  airPollutionData: any[] = [];
  city: string = '';

  constructor(private airPollutionService: AirPollutionService) {}

  getCurrentdata(): void {
    if (this.city ) {
      this.airPollutionService.getCurrentData(this.city).subscribe(
        data => this.airPollutionData = data,
        error => console.error('Error fetching data', error)
      );
    }
  }
}
