import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { ProfileComponent } from './dashboard/pages/profile/profile.component';
import { DashboardLayoutComponent } from './dashboard/layouts/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './auth/layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { InicioComponent } from './dashboard/pages/inicio/inicio.component';
import { HistorialComponent } from './dashboard/pages/historial/historial.component';

export const routes: Routes = [

    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginPageComponent },
            { path: 'register', component: RegisterPageComponent },
        ]
    },

    {
        path: '',
        component: DashboardLayoutComponent,
        canActivate: [isAuthenticatedGuard],
        children: [
            {
                path:'inicio',
                component: InicioComponent
            },
            {
                path: 'historial',
                component: HistorialComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
        ]
    },

    { path: '**', redirectTo: 'error', pathMatch: 'full' }
];
