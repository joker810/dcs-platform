import { inject, Injectable } from "@angular/core";
import { ExtensionPointRegistry } from "hmi.reusable.web.imp";
import { PluginDiscoveryService } from "hmi.reusable.web.imp";
import { SIDEBAR_EXTENSION_POINT } from "../extension-points/sidebar-extension-point";
import { ROUTE_EXTENSION_POINT } from "../extension-points/route-extension-point";
import { TOOLBAR_EXTENSION_POINT } from "../extension-points/toolbar-extension-point";
import { RouterContributionService } from "../routing/router-contribution.service";
// import { DevelopmentPluginSource } from "../../../plugin-sources/development-plugin-source";

@Injectable({
    providedIn:'root'
})
export class PlatformBootstrapService {
    private extensionPoints = inject(ExtensionPointRegistry);
    private discovery = inject(PluginDiscoveryService);
    private routerContributionService = inject(RouterContributionService);

    constructor(

    // private readonly extensionPoints:
    //     ExtensionPointRegistry,

    // private readonly discovery:
    //     PluginDiscoveryService,

    // private readonly routerContributionService: 
    //     RouterContributionService
    ){}

    async initialize(){

         this.extensionPoints.register(
            SIDEBAR_EXTENSION_POINT
        );

        this.extensionPoints.register(
            ROUTE_EXTENSION_POINT
        );

        // this.extensionPoints.register(
        //     TOOLBAR_EXTENSION_POINT
        // );....

        
        await this.discovery.discover();

        
    }

    
           

}