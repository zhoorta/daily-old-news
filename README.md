# DailyOldNews

Daily Old News uses the [New York Times API](http://developer.nytimes.com/) content to display the day news from:
- 100 years ago;
- 50 years ago;
- 25 years ago;

Based on Angular 4 and Bootstrap 4.

## Configuration

The configuration files are in `/environments`. 

Insert your `apiKey` ([get one from nyt](http://developer.nytimes.com/)).

In order to use a local copy from the NYT data, export the json files from NYT API and save under the configured `localStorageLocation` using as name: `yyyymm.json` (replace `yyyy` with the year and `mm` with the month). Enabling the local copy will disable the api requests. Configure `localStorage: 1` to enable local copy. 

Follow the [NYT Attributions and Restrictions](https://developer.nytimes.com/attribution).

## Screenshots

![Homepage](/src/assets/scr0.png "Home page")

![News](/src/assets/scr1.png "News")

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
