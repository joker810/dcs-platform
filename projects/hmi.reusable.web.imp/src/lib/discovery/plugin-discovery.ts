import { inject, Injectable } from '@angular/core';
import { PluginLifecycleManager } from '../lifecycle/plugin-lifecycle-manager';
import { PLUGIN_SOURCE } from './plugin-source';
import { PLUGIN_LOADER } from 'hmi.reusable.web.ifc';
import { HMI_LOGGER_TOKEN } from '../logging/hmi-logger-factory';


@Injectable({
    providedIn:'root'
})
export class PluginDiscoveryService{
    private source= inject(PLUGIN_SOURCE);
    private lifecycle= inject(PluginLifecycleManager);
    private loader = inject(PLUGIN_LOADER)
    private readonly logger = inject(HMI_LOGGER_TOKEN);
    
    constructor(
    ){}


   async discover(): Promise<void> {

  //metadata.
  const manifests =
    await this.source.discover();

    this.logger.info(`Discovered ${manifests.length} plugin manifests`, {
    count: manifests.length,
  });

  for (const manifest of manifests) {
    
    try{
      //plugin
    const plugin =
      await this.loader.load(manifest);

      const runtime =
      this.lifecycle.install(plugin);

    const resolved =
      this.lifecycle.resolve(runtime);

      if (resolved) {
      this.lifecycle.activate(runtime);
      this.logger.info(`Plugin ${manifest.plugin.exposedModule} activated`);
    }else{
      this.logger.warn(`Plugin ${manifest.plugin.exposedModule} could not be resolved`);
    }
    }
    catch(error){
      // Loader already logged the detailed error. Mark failed, continue.
      this.logger.error(`Plugin ${manifest.plugin.exposedModule} failed to load — skipping`, {
        pluginId: manifest.id,
        error: error instanceof Error ? error.message : String(error),
      });
    }

  }

}

}
//The PluginDiscoveryService class is responsible for discovering plugins from a specified source and registering them with the PluginRegistryService. It uses the jsonPluginSource to retrieve a list of plugins, which are then registered in the central plugin registry. This allows the application to dynamically load and manage plugins at runtime.