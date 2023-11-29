import { Routes } from '@angular/router';
import { ContentComponent } from '@components/content/content.component';
import { IsLoggedInGuard } from '@core/guards/is-logged-in.guard';
import { FormsExampleComponent } from '@ui/forms-example/forms-example.component';
import { WelcomePageComponent } from '@ui/welcome-page.component';

export const ROUTES: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('@ui/auth-page/auth.routes').then((routes) => mod.AUTH_ROUTES),
  // },
  {
    path: '',
    component: ContentComponent,
    canMatch: [IsLoggedInGuard],
    children: [
      {
        path: '',
        component: WelcomePageComponent,
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@ui/users-page/users.routes').then(
            (routes) => routes.USER_ROUTES
          ),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('@ui/events-page/events.routes').then(
            (routes) => routes.EVENTS_ROUTES
          ),
      },
      {
        path: 'forms',
        component: FormsExampleComponent,
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
      // {
      //   path: '**',
      //   component: PageNotFoundComponent,
      // },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
