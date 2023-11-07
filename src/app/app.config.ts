import { HttpClientModule } from '@angular/common/http';
import {
  ApplicationConfig,
  LOCALE_ID,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { LocalStorageService } from '@core/storage/local-storage.service';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { USER_API_PROVIDER } from 'src/app/domain/users/infrastructure/providers/user-api.provider';

//LANGUAGE
import { registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es';
registerLocaleData(localEs, 'es');

//CONFIG DATEPICKER
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CUSTOM_FORMATS_DATE } from 'src/app/utils/constants';

//CONFIG PAGINATOR
import { CustomPaginator } from 'src/app/utils/util-paginator';

//ROUTE
import { ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    USER_API_PROVIDER,
    LocalStorageService,
    provideRouter(ROUTES),
    importProvidersFrom(HttpClientModule, NgHttpLoaderModule.forRoot()),
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_FORMATS_DATE },
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
  ],
};
