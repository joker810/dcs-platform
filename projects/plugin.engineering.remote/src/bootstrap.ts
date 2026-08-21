import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { Component } from '@angular/core';

// Create a tiny, empty inline component just to satisfy the compiler bootstrap process
@Component({
  selector: 'app-root',
  standalone: true,
  template: ''
})
class EmptyRootComponent {}

bootstrapApplication(EmptyRootComponent, appConfig)
  .catch((err) => console.error(err));
