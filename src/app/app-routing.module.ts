import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('src/app/pages/login/login.module').then((m) => m.LoginPageModule),
    },
    {
        path: 'register',
        loadChildren: () => import('src/app/pages/register/register.module').then((m) => m.RegisterPageModule),
    },
    {
        path: 'verify-your-email',
        loadChildren: () => import('src/app/pages/verify-your-email/verify-your-email.module').then((m) => m.VerifyYourEmailPageModule),
    },
    {
        path: 'forgot-password',
        loadChildren: () => import('src/app/pages/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordPageModule),
    },
    {
        path: 'auth-handler',
        loadChildren: () => import('src/app/pages/auth-handler/auth-handler.module').then((m) => m.AuthHandlerPageModule),
    },
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/layouts/main/main-layout.module').then((m) => m.MainLayoutModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            initialNavigation: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
