import { PluginManifest } from './plugin-manifest';
import { ExtensionContribution } from '../extension/extension-contribution';

export interface Plugin {

    manifest: PluginManifest;

    contributions:

        ExtensionContribution<unknown>[];

}