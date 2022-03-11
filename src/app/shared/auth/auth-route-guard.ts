import { Injectable } from '@angular/core';
import { AppSessionService } from '../session/app-session.service';

import {
	CanActivate, Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
} from '@angular/router';
import * as _ from 'lodash';
import { Observable, Subscription, of } from 'rxjs';

@Injectable()
export class AppRouteGuard implements CanActivate {

	listMenu = [];

	constructor(
		private _router: Router,
		private _sessionService: AppSessionService,

	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean{
		
		this.listMenu = [];
		if (!this._sessionService.user) {
			this._router.navigate(['/app/login']);
			return false;
		}
		return true;
	}
}
