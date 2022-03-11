import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from '@abp/abpHttpInterceptor';

import * as ApiServiceProxies from './service-proxies';


// import { Interceptor } from '@core/models/interceptor';

@NgModule({
    providers: [
        ApiServiceProxies.AuthenticationServiceProxy,
        ApiServiceProxies.OrganizationServiceProxy,
        ApiServiceProxies.TitleServiceProxy,
        ApiServiceProxies.UserOrganizationServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    ]
})
export class ServiceProxyModule { }
