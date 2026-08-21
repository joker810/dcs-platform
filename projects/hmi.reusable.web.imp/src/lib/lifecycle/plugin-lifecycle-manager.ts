import { Injectable } from "@angular/core";
import { EventBus, PluginRuntime, PluginState,Plugin } from "hmi.reusable.web.ifc";
import { ExtensionPointRegistry } from "../registry/extension-point-registry";
import { ExtensionRegistry } from "../registry/extension-registry";
import { PluginRegistry } from "../registry/plugin-registry";
import { ServiceRegistry } from "../registry/service-registry";

@Injectable({
  providedIn: 'root'
})
export class PluginLifecycleManager {

  constructor(
    private readonly pluginRegistry: PluginRegistry,
    private readonly extensionRegistry: ExtensionRegistry,
    private readonly extensionPointRegistry: ExtensionPointRegistry,
    private readonly serviceRegistry: ServiceRegistry,
    // private readonly eventBus: EventBus
  ) {}


  //create runtime metadata.
  install(plugin: Plugin): PluginRuntime {

    const runtime: PluginRuntime = {

        plugin,

        descriptor: {
            manifest: plugin.manifest,
            state: PluginState.INSTALLED,
            installedTime: new Date(),
            activationTime: undefined,
            startupDuration: undefined,
            dependencies: [],
            errors: [],
            source: 'development'
        }
    };

    this.pluginRegistry.register(runtime);

    return runtime;

    }

    //resolve plugin dependencies and validate extension points.
    resolve(runtime: PluginRuntime): boolean {

    for (const contribution of runtime.plugin.contributions) {

        if (
            !this.extensionPointRegistry.has(
                contribution.extensionPointId
            )
        ) {
            this.pluginRegistry.addError(runtime.descriptor.manifest.id,"Unknown extension point " + contribution.extensionPointId);
            // runtime.descriptor.errors.push(`Unknown extension point ${contribution.extensionPoint.id}`);

            this.pluginRegistry.setState(
                runtime.descriptor.manifest.id,
                PluginState.FAILED
            );

            return false;
        }
    }

    this.pluginRegistry.setState(
        runtime.descriptor.manifest.id,
        PluginState.RESOLVED
    );

    return true;
    }

    //activate plugin and register contributions.
    activate(runtime: PluginRuntime): void {

    const start = performance.now();

    for (const contribution of runtime.plugin.contributions) {

        this.extensionRegistry.register(
            runtime.descriptor.manifest.id,
            contribution
        );

    }

    // Services later

    this.pluginRegistry.setState(

        runtime.descriptor.manifest.id,

        PluginState.ACTIVE

    );

    // this.eventBus.publish(

    //     new PluginActivatedEvent(

    //         runtime.descriptor.manifest.id

    //     )

    // );

    const duration = performance.now() - start;

    this.pluginRegistry.setStartupDuration(

        runtime.descriptor.manifest.id,

        duration

    );

}

    //stop plugin and unregister contributions.
    stop(pluginId: string): void {

        // this.serviceRegistry.unregisterPlugin(pluginId);

        this.extensionRegistry.removePlugin(pluginId);

        this.pluginRegistry.setState(
            pluginId,
            PluginState.STOPPED
        );

    }

    //uninstall plugin by stopping it and removing it from the registry.
    uninstall(pluginId: string): void {
        // this.stop(pluginId); tbd removes services , uncomment after service registry is implemented.
        this.pluginRegistry.remove(pluginId);
    }

    //restart plugin by stopping and activating it again.
    restart(pluginId: string): void {

        const runtime = this.pluginRegistry.get(pluginId);

        if (!runtime) {
            return;
        }

        // this.stop(pluginId);
        this.activate(runtime);

    }


}