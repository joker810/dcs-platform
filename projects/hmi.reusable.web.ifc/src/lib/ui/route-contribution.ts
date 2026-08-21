import { Type } from '@angular/core';

export interface RouteContribution {

    path: string;

    component: Type<unknown>;

}