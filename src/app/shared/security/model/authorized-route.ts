import { Route } from '@angular/router';

export type AuthorizedRoutes<R> = AuthorizedRoute<R>[];

export interface AuthorizedRoute<R> extends Route {
    accessAllowedTo?: R | R[];
    accessAllowedToAnyOf?: R[];
    permitAll?: boolean;
    children?: AuthorizedRoute<R>[];
}

export enum Role {
    User, Admin
}