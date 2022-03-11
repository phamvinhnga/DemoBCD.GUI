import * as moment from 'moment';
import { AppConsts } from '@shared/AppConsts';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Type, CompilerOptions, NgModuleRef, LOCALE_ID } from '@angular/core';
import { environment } from './environments/environment';

export class AppPreBootstrap {

    static run(appRootUrl: string, callBack):void {
        AppPreBootstrap.getApplicationConfig(appRootUrl, callBack);
    }

    static bootstrap<TM>(moduleType: Type<TM>, compilerOptions?: CompilerOptions | CompilerOptions[]): Promise<NgModuleRef<TM>> {
        return platformBrowserDynamic().bootstrapModule(moduleType, compilerOptions);
    }

    private static getApplicationConfig(appRootUrl: string, callBack) {
        return abp.ajax({
            url: appRootUrl + 'assets/' + environment.appConfig,
            method: 'GET',
            headers: {
            }
        }).done(result => {
            AppConsts.remoteServiceBaseUrl = result.remoteServiceBaseUrl;
            callBack();
        });
    }

    
}
