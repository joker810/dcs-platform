import {
    ExtensionPoint,
    MenuItem, ExtensionPoints
} from 'hmi.reusable.web.ifc';

export const ROUTE_EXTENSION_POINT:ExtensionPoint<MenuItem> = {

    id: ExtensionPoints.ROUTES,
    
    name: 'Route'
};