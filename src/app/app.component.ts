import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CommonModule, DatePipe } from '@angular/common';
import { WeatherService } from './weather.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, debounceTime, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, CommonModule, ReactiveFormsModule, MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatNativeDateModule, 
    MatCardModule,  FormsModule, MatInputModule, MatDatepickerModule,
  ],
  providers: [ provideNativeDateAdapter() , DatePipe, FormControl],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'services';
  userValues: any = {};
  weatherData: any;
  city: string = '';
  selectedCity: string = '';
  filteredCities: Observable<any[]>;
  cityControl = new FormControl('');
  mytemp: string = '';
  mycondition: string = '';
  myDate!: Date;
  dateString: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private weatherService: WeatherService
  ) {
    this.filteredCities = this.cityControl.valueChanges.pipe(
      debounceTime(300),
      filter(value => typeof value === 'string' && value.length >= 3),
      switchMap(value => {
        if (typeof value === 'string') {
          return this.weatherService.searchCities(value).pipe(
            catchError(error => {
              console.error('Error fetching cities:', error);
              return of([]);
            })
          );
        } else {
          return of([]); 
        }
      })
    );
  }

  ngOnInit(): void {
  }

  onCitySelected(event: MatAutocompleteSelectedEvent): void {
    this.city = event.option.viewValue;
  }

  Weather(values: any): void {
    this.userValues = values.value;
    // this.city = this.userValues.place;
    this.myDate = this.userValues.date;
    const day = this.myDate.getDate().toString();
    const month = (this.myDate.getMonth() + 1).toString(); // Month is zero-based
    const year = this.myDate.getFullYear().toString();
    this.dateString = `${year}-${month}-${day}`;
    this.getWeatherData();
  }

  getWeatherData(): void {
    this.weatherService.getWeather(this.city, this.dateString).subscribe(
      (data: any) => {
        this.mycondition = data.forecast.forecastday[0].day.condition.text;
        this.mytemp = data.forecast.forecastday[0].day.avgtemp_c.toString();
        this.cdr.detectChanges(); // Ensure change detection runs after updating data
      },
    );
  }
}