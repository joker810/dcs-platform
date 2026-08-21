import {
    ExtensionContribution,
    RouteContribution,
    ExtensionPoints,
    
} from 'hmi.reusable.web.ifc';

import { WelcomePageComponent } from '../components/welcome-page.component';

export const WelcomeRouteContribution:
ExtensionContribution<RouteContribution> = {

    extensionPointId: ExtensionPoints.ROUTES,

    contribution: {

        path: 'welcome',

        component: WelcomePageComponent

    }

};