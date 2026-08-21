import { InjectionToken } from "@angular/core";
import { PluginManifest } from "../plugin-manifest";
import { Plugin } from "../plugin";

export interface PluginLoader {

    load(
        manifest: PluginManifest
    ): Promise<Plugin>;

}

export const PLUGIN_LOADER =
    new InjectionToken<PluginLoader>(
        'PLUGIN_LOADER'
    );