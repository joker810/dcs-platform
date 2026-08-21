import {
    ExtensionPoint,
    MenuItem, ExtensionPoints
} from 'hmi.reusable.web.ifc';


export const SIDEBAR_EXTENSION_POINT:
    ExtensionPoint<MenuItem> = {

    id: ExtensionPoints.SIDEBAR,

    name: 'Sidebar'

};