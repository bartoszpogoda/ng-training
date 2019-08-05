import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from './model/authorized-route';


@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {

    isAccessAllowedTo(role: Role): Observable<boolean> {
        return of(role === Role.Admin);
    }

}