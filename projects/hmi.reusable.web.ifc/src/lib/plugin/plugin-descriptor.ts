import { PluginManifest } from './plugin-manifest';
import { PluginState } from './plugin-state';

export interface PluginDescriptor {

    manifest: PluginManifest;

    state: PluginState;

    installedTime: Date;

    activationTime?: Date;

    startupDuration?: number;

    dependencies: string[];

    errors: string[];

    source: string;

}