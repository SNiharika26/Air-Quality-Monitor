import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirPollutionService {
  private baseUrl = 'http://localhost:8080/api/air-pollution';  // Replace with your backend base URL

  constructor(private http: HttpClient) { }

  getHistoricalData(city: string, startDate: string, endDate: string): Observable<any> {
    const params = new HttpParams()
      .set('city', city)
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get(`${this.baseUrl}/historical`, { params });
  }
}
