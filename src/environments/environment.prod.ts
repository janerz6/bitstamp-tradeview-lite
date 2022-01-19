import {Environment} from "./environment-model";

export const environment: Environment = {
  production: true,
  bitstampTradeviewLiteSettings: {
    useMocks: true,
    apiUrl: 'https://www.bitstamp.net/api/'
  }
};
