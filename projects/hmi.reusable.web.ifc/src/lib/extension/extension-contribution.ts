// import { ExtensionPoint } from "./extension-point"; changed to string to avoid circular dependency

export interface ExtensionContribution<T> {

    extensionPointId: string;

    contribution: T;

}
//with this know which plugin contributed what. this is useful for debugging and for tracking which plugin contributed what. it is also useful for tracking which plugin contributed what to which extension point. this is useful for debugging and for tracking which plugin contributed what to which extension point.
export interface RegisteredContribution {

    pluginId: string;

    contribution: ExtensionContribution<unknown>;

}
//registered contribution is a contribution that has been registered by a plugin. it contains the plugin id and the contribution itself. this is used to keep track of which plugin registered which contribution.