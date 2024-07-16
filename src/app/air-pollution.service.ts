import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirPollutionService {
  private baseUrl = 'http://localhost:8080/api/air-pollution';  // Replace with your backend base URL

  constructor(private http: HttpClient) { }

  getCurrentData(city:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/current`, { params: { city } });
  }

  getHistoricalData(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/historical`, { params: { city } });
  }
}
