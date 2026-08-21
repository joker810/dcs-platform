// export interface PluginManifest {

//     id: string;

//     name: string;

//     version: string;

//     remoteEntry: string;
//     remoteName: string;
//     exposedModule: string;

//     vendor?: string;
//     description?: string;

// }//metadata

export interface PluginRemote {
    remoteEntry: string;
    exposedModule: string;
}

export interface PluginManifest {
    id: string;
    plugin: PluginRemote;

}

// //fetched json .pluginmanifest[] . might have multiple plugin meta datas.
export interface PluginCatalog {

    plugins: PluginManifest[];

}

