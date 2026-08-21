// import { Injectable } from "@angular/core";
// import { PluginLoader, PluginManifest,Plugin } from "hmi.reusable.web.ifc";
// import {WelcomePlugin} from "hmi.plugin.engineering";

// @Injectable({
//   providedIn: 'root'
// })
// export class DevelopmentPluginLoader
// implements PluginLoader {

//   async load(manifest: PluginManifest): Promise<Plugin> {

//     if (manifest.id === 'welcome') {
//       return WelcomePlugin;
//     }

//     throw new Error(
//       `Unknown plugin: ${manifest.id}`
//     );
//   }
// }