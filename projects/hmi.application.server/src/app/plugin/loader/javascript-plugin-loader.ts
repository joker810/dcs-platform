// import { Injectable } from "@angular/core";
// import { PluginLoader, PluginManifest,Plugin } from "hmi.reusable.web.ifc";

// @Injectable({
//     providedIn: 'root'
// })
// export class JavaScriptPluginLoader
//     implements PluginLoader {

//     async load(
//         manifest: PluginManifest
//     ): Promise<Plugin> {

//         const module = await import(
//             /* @vite-ignore */
//             manifest.plugin
//         );

//         const plugin = module.plugin as Plugin;

//         if (!plugin) {
//             throw new Error(
//                 `Plugin ${manifest.id} does not export "plugin"`
//             );
//         }

//         if (plugin.manifest.id !== manifest.id) {
//             throw new Error(
//                 `Plugin ID mismatch: catalog=${manifest.id}, loaded=${plugin.manifest.id}`
//             );
//         }

//         return plugin;
//     }
// }