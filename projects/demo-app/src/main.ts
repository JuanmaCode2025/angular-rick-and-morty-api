import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // <-- Cambiamos 'App' por 'AppComponent'

// Encendemos la aplicación usando nuestra clase corregida
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));