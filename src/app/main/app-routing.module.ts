import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrganizationComponent } from './organization/organization.component';
import { TitleComponent } from './title/title.component';
import { OrganizationTitleComponent } from './organization-title/organization-title.component';
import { UserOrganizationComponent } from './userOrganization/userOrganization.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    {
                        path: 'login',
                        component: LoginComponent,
                        // canActivate: [AppRouteGuard]
                    },
                    {
                        path: 'register',
                        component: RegisterComponent,
                    },
                    {
                        path: 'organization',
                        component: OrganizationComponent,
                        canActivate: [AppRouteGuard]
                    },
                    {
                        path: 'title',
                        component: TitleComponent,
                        canActivate: [AppRouteGuard]
                    },
                    {
                        path: 'organization-title',
                        component: OrganizationTitleComponent,
                        canActivate: [AppRouteGuard]
                    },
                          {
                        path: 'user-organization',
                        component: UserOrganizationComponent,
                        canActivate: [AppRouteGuard]
                    },
                ]
            },

        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
