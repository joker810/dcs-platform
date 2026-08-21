import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { PlatformBootstrapService } from './core/startup/platform-bootstrap.service';
import { provideAppInitializer } from '@angular/core';
import { PLUGIN_SOURCE } from 'hmi.reusable.web.imp';
// import { DevelopmentPluginSource } from '../plugin-sources/development-plugin-source';
import { JsonPluginSource } from '../plugin-sources/json-plugin-source'
import { PLUGIN_LOADER } from 'hmi.reusable.web.ifc';
import { NativeFederationPluginLoader } from './plugin/loader/nativeFederation-plugin-loader';
// import { DevelopmentPluginLoader } from '../plugin-sources/development-plugin-loader';
// import { JavaScriptPluginLoader } from './plugin/loader/javascript-plugin-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAppInitializer(() => {
      const bootstrapService = inject(PlatformBootstrapService);
      return bootstrapService.initialize();
    }),
     {
        provide: PLUGIN_SOURCE,
        useClass: JsonPluginSource
    },
      {
        provide: PLUGIN_LOADER,
        useClass: NativeFederationPluginLoader
      }
  ],
};
