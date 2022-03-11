import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { PlatformLocation, registerLocaleData } from '@angular/common';

import { AbpModule } from '@abp/abp.module';

import { SharedModule } from '@shared/shared.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { RootRoutingModule } from './root-routing.module';

import { AppConsts } from '@shared/AppConsts';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';

import { RootComponent } from './root.component';
import { AppPreBootstrap } from '../AppPreBootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import * as _ from 'lodash';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { AppSessionService } from '@shared/session/app-session.service';

export function appInitializerFactory(injector: Injector, platformLocation: PlatformLocation) {

    return () => {

        return new Promise<boolean>((resolve, reject) => {
             
            AppConsts.appBaseHref = getBaseHref(platformLocation);
            const appBaseUrl = getDocumentOrigin() + AppConsts.appBaseHref;
            AppPreBootstrap.run(appBaseUrl, () => {

                const appSessionService:AppSessionService = injector.get(AppSessionService);

                appSessionService.init().then(
                    (result) => {
                        resolve(result);
                    }
                );
            });
        })
    }
    
}


export function getRemoteServiceBaseUrl(): string {
    return AppConsts.remoteServiceBaseUrl;
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule.forRoot(),
        AbpModule,
        ServiceProxyModule,
        RootRoutingModule,
        HttpClientModule,
        NgbModule.forRoot(),
        TranslateModule.forRoot(),
    ],
    declarations: [
        RootComponent,
    ],
    providers: [
        { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [Injector, PlatformLocation],
            multi: true
        },
        {
            provide: LOCALE_ID,
            useValue: "vi-VN",
        },
    ],
    bootstrap: [RootComponent]
})

export class RootModule {
    constructor(public injector: Injector) {
    }
}

export function getBaseHref(platformLocation: PlatformLocation): string {
    const baseUrl = platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
        return baseUrl;
    }

    return '/';
}

function getDocumentOrigin() {
    if (!document.location.origin) {
        return document.location.protocol + '//' +
            document.location.hostname + (document.location.port ? ':' + document.location.port : '');
    }

    return document.location.origin;
}
