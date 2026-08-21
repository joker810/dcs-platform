import { Injectable, signal } from '@angular/core';
import { PluginDescriptor, PluginRuntime, PluginState } from 'hmi.reusable.web.ifc';

@Injectable({
  providedIn: 'root'
})
export class PluginRegistry {

    private readonly plugins =
        signal(
            new Map<string, PluginRuntime>()
        );

    // pluginsSignal = this.plugins.asReadonly();

    register(runtime: PluginRuntime): void {

    this.plugins.update(map => {
        const copy = new Map(map);

        copy.set(
            runtime.descriptor.manifest.id,
            runtime
        );

        return copy;

    });
    }

    remove(id: string): void {

    this.plugins.update(map => {

        const copy = new Map(map);

        copy.delete(id);

        return copy;

    });

    }

    get(id: string): PluginRuntime | undefined {
    return this.plugins().get(id);
    }

    getActive(): PluginRuntime[] {

    return [...this.plugins().values()]

        .filter(
            p =>
                p.descriptor.state === PluginState.ACTIVE
        );

    }

    setState(id: string, state: PluginState): void {

        this.updateDescriptor(id, descriptor => ({
            ...descriptor,
            state
        }));
    }

    has(id: string): boolean {
    return this.plugins().has(id);
    }

    getAll(): PluginRuntime[] {
    return [...this.plugins().values()];
    }

    addError(id: string, error: string): void {
        this.updateDescriptor(id, descriptor => ({
            ...descriptor,
            errors: [...descriptor.errors, error]
        }));
    }

    setStartupDuration(id: string, duration: number): void {

        this.updateDescriptor(id, descriptor => ({
            ...descriptor,
            startupDuration: duration
        }));

    }

    // unregisterPlugin(id: string): void {

    //     this.plugins.update(map => {
    //         const copy = new Map(map);
    //         copy.delete(id);
    //         return copy;
    //     });

    // }

    updateDescriptor(
        id: string,
        updater: (
            descriptor: PluginDescriptor
        ) => PluginDescriptor
    ): void {

        this.plugins.update(map => {

            const runtime = map.get(id);

            if (!runtime) {
                return map;
            }

            const copy = new Map(map);
            const updatedRuntime: PluginRuntime = {
                ...runtime,
                descriptor: updater(runtime.descriptor)
            };

            copy.set(id, updatedRuntime);
            return copy;

        });
    }

}