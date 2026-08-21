import { computed, inject, Injectable, Signal, signal } from "@angular/core";
import { RegisteredContribution, ExtensionContribution } from "hmi.reusable.web.ifc";
import { ExtensionPointRegistry } from "./extension-point-registry";


@Injectable({
    providedIn:'root'
})
export class ExtensionRegistry {

    pointRegistry = inject(ExtensionPointRegistry);
    
    //signal map
    private readonly registry =
        signal(

            new Map<
                string,
                RegisteredContribution[]
            >()

        );
    

    //methods
    register(
        pluginId:string,
        contribution:ExtensionContribution<unknown>
    ){
        if(
            !this.pointRegistry.has(contribution.extensionPointId)
            ){
            throw new Error("Unknown extension point");
            }//validate for typo or extension point not registered yet.

        this.registry.update(map=>{

        const copy = new Map(map);
        const list = copy.get(contribution.extensionPointId) ?? [];

            copy.set(contribution.extensionPointId,
            [
                ...list,
                {
                    pluginId,
                    contribution
                }
            ]
        );

        return copy;
    });
    }

    // getContributions<T>(
    //     pointId:string
    //     ):T[]{

    //         const list = this.registry()
    //                      .get(pointId)
    //                     ?? [];

    //         return list.map(
    //             x=>x.contribution.contribution as T
    //         );
    //     }

        contributions<T>(extensionPointId: string): Signal<T[]>{
            return computed(() => {

        const list =

        this.registry()
            .get(extensionPointId)
        ?? [];

        return list.map(
        c => c.contribution.contribution as T
        );

        });
        }

    
    removePlugin(
        pluginId:string
        ){

            this.registry.update(map => {

                const copy = new Map(map);

                for (const [extensionPointId, contributions] of map.entries()) {

                    const filtered = contributions.filter(
                        x => x.pluginId !== pluginId
                    );

                    if (filtered.length > 0) {
                        copy.set(extensionPointId, filtered);
                    } else {
                        copy.delete(extensionPointId);
                    }
                }

                return copy;
            });
        }
}