import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from '../routes/app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideFirebaseApp, initializeApp, getApps, getApp} from '@angular/fire/app';
import { environment } from '../../environments/environment';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import { setLogLevel } from 'firebase/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => {
      const apps = getApps();
      return apps.length === 0
        ? initializeApp(environment.firebase)
        : getApp();
    }),

    provideFirestore(() => {
      const firestore = getFirestore();
      setLogLevel('debug');
      return firestore;
    })
  ]
};


