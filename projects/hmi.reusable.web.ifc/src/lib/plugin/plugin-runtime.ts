import {PluginDescriptor} from './plugin-descriptor';
import {Plugin} from './plugin';

export interface PluginRuntime {

    descriptor: PluginDescriptor;

    plugin: Plugin;

}