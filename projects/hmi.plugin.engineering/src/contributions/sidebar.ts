import {
    ExtensionContribution,
    MenuItem,
    ExtensionPoints,
} from 'hmi.reusable.web.ifc';

export const WelcomeSidebarContribution:
ExtensionContribution<MenuItem> = {

    extensionPointId: ExtensionPoints.SIDEBAR,

    contribution: {

        id: 'welcome',

        text: 'Welcome',

        icon: 'home',

        route: '/welcome'

    }

};