import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { USER_API_PROVIDER } from 'src/app/domain/users/infrastructure/providers/user-api.provider';
import { ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    USER_API_PROVIDER,
    provideRouter(ROUTES),
    importProvidersFrom(HttpClientModule, NgHttpLoaderModule.forRoot()),
    provideAnimations(),
  ],
};
