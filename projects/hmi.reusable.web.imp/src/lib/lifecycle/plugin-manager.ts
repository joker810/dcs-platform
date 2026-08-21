import { Injectable, inject } from "@angular/core";
import { PluginState } from "hmi.reusable.web.ifc";
import { PluginRegistry } from "../registry/plugin-registry";
import { PluginLifecycleManager } from "./plugin-lifecycle-manager";

@Injectable({
    providedIn: 'root'
})
export class PluginManager {

    private readonly registry =
        inject(PluginRegistry);

    private readonly lifecycle =
        inject(PluginLifecycleManager);

    uninstall(pluginId: string): void {

        const runtime =
            this.registry.get(pluginId);
            

        if (!runtime) {
            return;
        }

        const id = runtime.descriptor.manifest.id;

        // if (runtime?.descriptor.state === PluginState.ACTIVE) {
            this.lifecycle.stop(id);
        // }

        this.lifecycle.uninstall(id);
    }
}