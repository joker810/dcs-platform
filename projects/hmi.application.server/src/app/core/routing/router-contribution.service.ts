import { Injectable, effect, inject } from "@angular/core";
import { Router} from "@angular/router";
import { ExtensionRegistry } from "hmi.reusable.web.imp";
import { ExtensionPoints,RouteContribution } from "hmi.reusable.web.ifc";

@Injectable({
  providedIn: 'root'
})
export class RouterContributionService {

    private readonly router = inject(Router);
    private readonly registry = inject(ExtensionRegistry);

    constructor() {

        effect(() => {

            const routes = this.registry
                .contributions<RouteContribution>(
                    ExtensionPoints.ROUTES
                )();

            console.log('Plugin routes', routes);

            // this.router.resetConfig(
            //     routes.map(r => ({
            //         path: r.path,
            //         component: r.component
            //     }))
            // );

             // 1. Get a shallow copy of the current active routes
        const currentConfig = [...this.router.config];

        // 2. Map the new plugin routes
        const newRoutes = routes.map(route => ({
            path: route.path,
            component: route.component
        }));

        // 3. Merge them (Filter out duplicates if necessary)
        const updatedConfig = [...currentConfig, ...newRoutes];

        // 4. Safely reset the config with the merged list
        this.router.resetConfig(updatedConfig);

        });

    }
}