import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BitstampTradeviewLiteLibModule} from "bitstamp-tradeview-lite-lib";
import {environment} from "../environments/environment";
import {BITSTAMP_TRADEVIEW_LITE_SETTINGS_INJECTION_TOKEN} from "bitstamp-tradeview-lite-lib";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BitstampTradeviewLiteLibModule
  ],
  providers: [{
    provide: BITSTAMP_TRADEVIEW_LITE_SETTINGS_INJECTION_TOKEN, useValue: environment.bitstampTradeviewLiteSettings
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
