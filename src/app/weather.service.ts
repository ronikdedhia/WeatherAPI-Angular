import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '13abcb94241f42b6b3d93503241507';
  private apiUrl2 = 'https://api.weatherapi.com/v1/search.json';
  private apiUrl = 'https://api.weatherapi.com/v1/history.json';

  constructor(private http: HttpClient) { }

  getWeather(city: string, date: string): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${city}&dt=${date}`;
    return this.http.get(url);
  }

  searchCities(query: string): Observable<any[]> {
    const params = {
      key: this.apiKey,
      q: query
    };
    return this.http.get<any>(this.apiUrl2, { params })
      .pipe(
        map(response => response.map((item: any) => ({ name: item.name })))
      );
  }
}