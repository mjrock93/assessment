import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { globalErrorInterceptor } from './interceptor/error.interceptor';
import { provideStore } from '@ngrx/store';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([globalErrorInterceptor])),
    provideAnimations(),
    importProvidersFrom(ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        preventDuplicates: true
    })), provideStore()]
};