import { bootstrap } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
import { AppComponent, environment } from './app/'
import { appRouterProviders } from './app/app.routes'
import { HTTP_PROVIDERS } from '@angular/http'
import { disableDeprecatedForms, provideForms } from '@angular/forms'
import { LoggedInGuard } from './app/logged-in.guard'
import { UserService } from './app/user.service'
import {GOOGLE_MAPS_PROVIDERS, provideLazyMapsAPILoaderConfig} from 'angular2-google-maps/core'
import { Broadcaster } from './app/broadcaster'

if (environment.production) {
  enableProdMode()
}

bootstrap(AppComponent, [
    appRouterProviders,
    HTTP_PROVIDERS,
    disableDeprecatedForms,
    provideForms,
    UserService,
    LoggedInGuard,
    GOOGLE_MAPS_PROVIDERS,
    provideLazyMapsAPILoaderConfig({
      apiKey: 'AIzaSyAxocTsOHX8hICM5TMlgFeY0inINATgvg8',
    }),
    Broadcaster,
])
