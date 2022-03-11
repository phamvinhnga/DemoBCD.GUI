import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';

import { AppSessionService } from './session/app-session.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';

@NgModule({
    imports: [
        CommonModule,
        AbpModule,
        RouterModule,
    ],
    declarations: [
    ],
    entryComponents: [
    ],
    exports: [
    ],
    providers: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AppSessionService,
                AppAuthService,
                AppRouteGuard,
            ]
        }
    }
}
