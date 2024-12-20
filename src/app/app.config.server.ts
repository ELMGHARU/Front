import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

// Merging the app configuration with the server-specific configuration
export const config: ApplicationConfig = mergeApplicationConfig(appConfig, serverConfig);
