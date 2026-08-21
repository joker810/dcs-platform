import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { PluginManifest ,PluginCatalog} from "hmi.reusable.web.ifc";
import { PluginSource } from "hmi.reusable.web.imp";

@Injectable({
    providedIn: 'root'
})
export class JsonPluginSource implements PluginSource {

    private readonly http =
        inject(HttpClient);

    async discover(): Promise<PluginManifest[]> {

        const manifest =
            await firstValueFrom(
                this.http.get<PluginCatalog>(
                    '/plugins.json'
                )
            );

        return manifest.plugins;
    }
}
//get json .plugin manifest[]