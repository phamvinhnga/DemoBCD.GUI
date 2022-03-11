import { Injectable } from '@angular/core';
import { TokenService } from 'abp-ng2-module/dist/src/auth/token.service';
import { AppConsts } from '@shared/AppConsts';
import { UtilsService } from 'abp-ng2-module/dist/src/utils/utils.service';
import * as _ from 'lodash';
import { AuthenticationServiceProxy } from '@shared/service-proxies/service-proxies';

@Injectable()
export class AppSessionService {

    private _user: any;
    
    constructor(
        private _tokenAuth: TokenService,
        private _authenticationServiceProxy:AuthenticationServiceProxy
    ) {
    }

    get user() {
        return this._user;
    }


    init(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
 
            var valueAuthToken = new UtilsService().getCookieValue(AppConsts.authorization.abpAuthToken);

            if (!valueAuthToken || valueAuthToken == '') {
                resolve(true);
            }
            else {
                this._authenticationServiceProxy.getCurrentUser().toPromise().then((result: any) => {
                    if (result && result.id) {
                        this._user = result;
                    }
                    else this._user = null;

                    resolve(true);

                }, (err) => {
                    resolve(true);
                });
            }
        });
    }

    destroy(): void {
        this._tokenAuth.clearToken();
        this._user = null;
        location.reload();
    }
}
