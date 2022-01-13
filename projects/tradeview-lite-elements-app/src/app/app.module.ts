import {DoBootstrap, Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {createCustomElement} from "@angular/elements";
import {BitstampTradeviewLiteComponent, BitstampTradeviewLiteLibModule} from "bitstamp-tradeview-lite-lib";

@NgModule({
  imports: [
    BrowserModule,
    BitstampTradeviewLiteLibModule
  ]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    customElements.define('bitstamp-tradeview-lite', createCustomElement(BitstampTradeviewLiteComponent, {injector: this.injector}));
  }
}
