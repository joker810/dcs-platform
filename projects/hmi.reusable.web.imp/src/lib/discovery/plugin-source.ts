import { InjectionToken } from "@angular/core";
import {Plugin, PluginManifest,PluginCatalog} from "hmi.reusable.web.ifc";
export interface PluginSource {

    // discover(): Promise<Plugin[]>;
    discover(): Promise<PluginManifest[]>;

}

export const PLUGIN_SOURCE = new InjectionToken<PluginSource>('PLUGIN_SOURCE');
//abstract class that defines the interface for a plugin source. a plugin source is responsible for discovering plugins and returning them as an array of Plugin objects. this allows for different implementations of plugin sources, such as local file system, remote server, etc.