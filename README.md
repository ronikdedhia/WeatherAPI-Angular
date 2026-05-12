# WeatherAPI — Angular

![Angular](https://img.shields.io/badge/Angular-18-DD0031?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript)
![WeatherAPI](https://img.shields.io/badge/API-WeatherAPI.com-lightblue)
![Angular Material](https://img.shields.io/badge/UI-Angular%20Material-3F51B5?logo=angular)
![License](https://img.shields.io/badge/License-MIT-yellow)

An Angular 18 single-page application that lets users look up **historical weather conditions** for any city on any past date. It uses the [WeatherAPI.com](https://www.weatherapi.com) history endpoint with a city autocomplete search, a Material date picker, and a clean card-based results display.

---

## Features

- City autocomplete — search cities with live suggestions from the WeatherAPI `/search` endpoint (debounced, triggers after 3 characters)
- Date picker — select any historical date using Angular Material Datepicker
- Displays weather results: temperature and condition
- OnPush change detection for optimal performance
- Standalone Angular components (no NgModules)
- Angular Material: Autocomplete, Card, Input, DatePicker, Button, Form Field

---

## Tech Stack

| Component | Technology |
|---|---|
| Frontend | Angular 18 (standalone) |
| UI Library | Angular Material 18 |
| External API | [WeatherAPI.com](https://www.weatherapi.com) |
| Language | TypeScript 5.5 |
| Reactive State | RxJS (`debounceTime`, `switchMap`, `catchError`) |
| Forms | Angular Reactive Forms |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Angular CLI: `npm install -g @angular/cli`
- A free API key from [https://www.weatherapi.com](https://www.weatherapi.com)

### 1. Install dependencies

```bash
npm install
```

### 2. Set your API key

Open `src/app/weather.service.ts` and replace the `apiKey` value:

```ts
private apiKey = 'YOUR_WEATHERAPI_KEY';
```

### 3. Start the development server

```bash
npm start
# or: ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

---

## How It Works

1. Start typing a city name (3+ characters) — the autocomplete dropdown fetches matching cities via `GET https://api.weatherapi.com/v1/search.json`
2. Select a city and choose a historical date from the date picker
3. Click **Search** — the app calls `GET https://api.weatherapi.com/v1/history.json` with the selected city and date
4. Temperature and weather condition are displayed in a Material card

---

## File Structure

```
├── src/
│   └── app/
│       ├── app.component.ts          # Main UI logic (autocomplete, date, weather call)
│       ├── app.component.html        # Template
│       ├── weather.service.ts        # WeatherAPI HTTP service
│       ├── contact.service.ts        # Contacts helper service
│       ├── app.routes.ts             # Router config
│       └── app.config.ts             # Bootstrap config
│   └── public/
│       └── assets/contacts.json      # Static contacts data
├── angular.json
├── package.json
└── tsconfig.json
```

---

## Screenshots

> _Add screenshots of the city search autocomplete and weather result card here._

---

## License

This project is licensed under the [MIT License](LICENSE).
