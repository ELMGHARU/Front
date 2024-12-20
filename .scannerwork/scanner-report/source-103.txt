import { bootstrapApplication } from '@angular/platform-browser';
import {AppComponent} from "./app/app.component";
import {appConfig} from "./app/app.config";
// Assurez-vous que votre configuration est correcte

bootstrapApplication(AppComponent, appConfig)
  .catch((err: Error) => {
    console.error('Une erreur est survenue lors du démarrage de l\'application :', err);
    throw err; // Propager l'erreur
  });

