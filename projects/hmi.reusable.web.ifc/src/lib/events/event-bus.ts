import { PlatformEvent } from "./platform-event";

export interface EventBus{

    publish(event:PlatformEvent):void;

    subscribe<T>(

        type:string,

        callback:(event:T)=>void

    ):void;

}