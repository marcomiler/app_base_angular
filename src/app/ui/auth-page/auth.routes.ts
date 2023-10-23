import { Route } from '@angular/router';
import { AuthPageComponent } from '@ui/auth-page/auth-page.component';
import { LoginComponent } from '@ui/auth-page/pages/login/login.component';
import { RecoverPasswordComponent } from '@ui/auth-page/pages/recover-password/recover-password.component';

export const AUTH_ROUTES: Route[] = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'recover-password',
        component: RecoverPasswordComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];
