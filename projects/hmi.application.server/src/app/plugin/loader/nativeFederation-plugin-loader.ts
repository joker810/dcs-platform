import { Injectable } from "@angular/core";
import { PluginManifest,Plugin } from "hmi.reusable.web.ifc";
import { loadRemoteModule } from '@angular-architects/native-federation';

@Injectable({
    providedIn: 'root'
})
export class NativeFederationPluginLoader{
    
    async load(manifest: PluginManifest): Promise<Plugin> {

        const module = await loadRemoteModule({
            remoteEntry: manifest.plugin.remoteEntry,
            exposedModule: manifest.plugin.exposedModule
        });

        const plugin = module.Plugin as Plugin;

        if (!plugin) {
            throw new Error(
                `Plugin ${manifest.id} does not export "Plugin"`
            );
        }

        return plugin;
    }
}