import { ExtensionContribution} from 'hmi.reusable.web.ifc';
import { WelcomeSidebarContribution } from './contributions/sidebar';
import { WelcomeRouteContribution } from './contributions/routes';

// Actual plugin contract this doesn't need to know how plugin loads.
export interface PluginDescriptor {
  id: string;
}

interface Plugin {
    manifest:PluginDescriptor,
    contributions: ExtensionContribution<unknown>[]
}

export const WelcomePlugin: Plugin = {

    manifest: {

        id: 'welcome'

    },

    contributions: [

        WelcomeSidebarContribution,
        WelcomeRouteContribution

    ]

};