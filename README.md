# Angular 6 Cli - Dynamic Components Loader & Runtime Components

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.x

## Dynamic Components Loader

1. create a module PartsModule:NgModule (holder of small pieces)

2. create another module DynamicModule:NgModule, which will contain our dynamic component(and reference PartsModule dynamically)

3. create dynamic Template (simple approach)

4. create new Component type (only if template has changed)

5. create new RuntimeModule:NgModule. This module will contain the previously created Component type

6. call RuntimeCompiler.compileModuleAndAllComponentsAsync(runtimeModule) to get ComponentFactory

7. create an Instance of the DynamicComponent - job of the View Target placeholder and ComponentFactory

8. assign @Inputs to new instance (switch from INPUT to TEXTAREA editing), consume @Outputs

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
