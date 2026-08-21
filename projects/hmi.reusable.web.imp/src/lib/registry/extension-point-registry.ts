import { Injectable, Signal, computed, signal } from '@angular/core';
import { ExtensionPoint } from 'hmi.reusable.web.ifc';

@Injectable({
    providedIn: 'root'
})
export class ExtensionPointRegistry {

    //signals.
    private readonly registry =
        signal(new Map<string, ExtensionPoint<unknown>>());

    readonly size: Signal<number> =
        computed(() => this.registry().size);

    //methods.
    register(point: ExtensionPoint<unknown>): void {

        this.registry.update(map => {

            const copy = new Map(map);

            copy.set(point.id, point);

            return copy;

        });

    }

    unregister(id: string): void {

        this.registry.update(map => {

            const copy = new Map(map);

            copy.delete(id);

            return copy;
            //signal update function should return a new value, not mutate the existing one. if we map.set signal wont detect the change and will not trigger the subscribers. so we need to create a new map and return it.
        });

    }

    has(id: string): boolean {

        return this.registry().has(id);

    }

    get(id: string): ExtensionPoint<unknown> | undefined {

        return this.registry().get(id);

    }

    getAll(): ExtensionPoint<unknown>[] {

        return [...this.registry().values()];

    }

}