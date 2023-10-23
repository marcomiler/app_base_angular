import { Route } from '@angular/router';
import { UsersListPageComponent } from '@ui/users-page/pages/users-list-page/users-list-page.component';
import { UsersPageComponent } from '@ui/users-page/users-page.component';

export const USER_ROUTES: Route[] = [
  {
    path: '',
    component: UsersPageComponent,
    children: [
      {
        path: '',
        component: UsersListPageComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];
