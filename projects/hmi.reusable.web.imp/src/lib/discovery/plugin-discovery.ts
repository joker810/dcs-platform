import { inject, Injectable } from '@angular/core';
import { PluginLifecycleManager } from '../lifecycle/plugin-lifecycle-manager';
// import { PluginSource } from './plugin-source';// later with injection token maybe
// import { PluginManifest } from 'hmi.reusable.web.ifc';
import { PLUGIN_SOURCE } from './plugin-source';
import { PLUGIN_LOADER } from 'hmi.reusable.web.ifc';


@Injectable({
    providedIn:'root'
})
export class PluginDiscoveryService{
    private source= inject(PLUGIN_SOURCE);
    private lifecycle= inject(PluginLifecycleManager);
    private loader = inject(PLUGIN_LOADER)
    
    constructor(
    ){}


   async discover(): Promise<void> {

  //metadata.
  const manifests =
    await this.source.discover();

    console.log(
      'Discovered manifests:',
      manifests
    );

  for (const manifest of manifests) {

    //plugin
    const plugin =
      await this.loader.load(manifest);

    console.log(
      'Loaded plugin:',
      plugin
    );

    const runtime =
      this.lifecycle.install(plugin);

    const resolved =
      this.lifecycle.resolve(runtime);

    if (resolved) {
      this.lifecycle.activate(runtime);
    }
  }
}

}
//The PluginDiscoveryService class is responsible for discovering plugins from a specified source and registering them with the PluginRegistryService. It uses the jsonPluginSource to retrieve a list of plugins, which are then registered in the central plugin registry. This allows the application to dynamically load and manage plugins at runtime.