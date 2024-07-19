import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirPollutionService {
  private baseUrl = 'http://localhost:8080/api/air-pollution';  // Replace with your backend base URL
  private apiUrl = 'http://localhost:8080/api/contact';
  constructor(private http: HttpClient) { }

  getCurrentData(city:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/current`, { params: { city } });
  }

  getHistoricalData(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/historical`, { params: { city } });
  }
  getForecastData(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/forecast`, { params: { city } });
  }
  submitContactForm(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData, { responseType: 'text' }); // Specify responseType as 'text'
  }
}
