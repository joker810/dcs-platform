import {
    ExtensionPoint,
    MenuItem,ExtensionPoints
} from 'hmi.reusable.web.ifc';

export const TOOLBAR_EXTENSION_POINT:ExtensionPoint<MenuItem> = {

    id: ExtensionPoints.TOOLBAR,
    
    name: 'Toolbar'
};