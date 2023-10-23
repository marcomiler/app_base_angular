import { Route } from '@angular/router';
import { EventsPageComponent } from '@ui/events-page/events-page.component';
import { EventsListPageComponent } from '@ui/events-page/pages/events-list-page/events-list-page.component';

export const EVENTS_ROUTES: Route[] = [
  {
    path: '',
    component: EventsPageComponent,
    children: [
      {
        path: '',
        component: EventsListPageComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];
