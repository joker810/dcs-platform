import { Injectable , inject} from "@angular/core";
import { loadRemoteModule } from '@angular-architects/native-federation';
import { PluginManifest,Plugin } from "hmi.reusable.web.ifc";
import { HMI_LOGGER_TOKEN } from "hmi.reusable.web.imp";    

@Injectable({
    providedIn: 'root'
})
export class NativeFederationPluginLoader{

    private readonly logger = inject(HMI_LOGGER_TOKEN);

    async load(manifest: PluginManifest): Promise<Plugin> {
        const context = {
            pluginId: manifest.id,
            remoteEntry: manifest.plugin.remoteEntry,
            exposedModule: manifest.plugin.exposedModule,
        };

        try {
            const module = await loadRemoteModule({
            remoteEntry: manifest.plugin.remoteEntry,
            exposedModule: manifest.plugin.exposedModule,
            });

            const plugin = module.Plugin as Plugin;
            if (!plugin) {
            throw new Error(`Plugin ${manifest.id} does not export "Plugin"`);
            }

            this.logger.info(`Plugin ${plugin?.manifest.id} loaded successfully`, context);
            return plugin;

        } catch (error) {
            this.logger.fatal(`Plugin ${manifest.id} failed to load`, {
            ...context,
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            });
            throw error; // rethrow so discover() can skip this plugin
        }
    } 
}