import { inject, Injectable } from "@angular/core";
import { ExtensionPointRegistry, PluginDiscoveryService , HMI_LOGGER_TOKEN  } from "hmi.reusable.web.imp";
import { SIDEBAR_EXTENSION_POINT } from "../extension-points/sidebar-extension-point";
import { ROUTE_EXTENSION_POINT } from "../extension-points/route-extension-point";
import { RouterContributionService } from "../routing/router-contribution.service";


@Injectable({
    providedIn:'root'
})
export class PlatformBootstrapService {
    private extensionPoints = inject(ExtensionPointRegistry);
    private discovery = inject(PluginDiscoveryService);
    //instance is enough to register the route.
    private routerContributionService = inject(RouterContributionService);
    private readonly logger = inject(HMI_LOGGER_TOKEN);

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

        this.logger.info('Shell extension points registered');

        
        // 2. Kick off plugin discovery in the background — do NOT await it here.
        //    The shell renders immediately. Plugins appear when they load.
        void this.discovery.discover().catch((error) => {
        // This catch is a final safety net. Per-plugin errors are handled inside discover().
        this.logger.error('Plugin discovery pipeline failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        });
    
    }
}