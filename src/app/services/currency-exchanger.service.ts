import { Injectable } from '@angular/core';
import { Connector } from '../provider/http-common';
import { environment as ENV } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangerService {

  constructor(public connector: Connector) { }

   /* 
  TODO: get all symbols
  */
  getAllSymbols = () => {
    const URL = `${ENV.BASE_URL + ENV.GET_ALL_SYMBOLS}?access_key=${ENV.API_KEY}`;
    return this.connector.Get(URL)
  }

  /* 
  TODO: get latest symbols
  */
  getLatestSymbols = (data:any) => {
    const URL = `${ENV.BASE_URL + ENV.GET_LATEST_SYMBOLS}?base=${data.base}&symbols=${data.symbols.toString()}`;

    return this.connector.Get(URL)
  }

  /* 
  TODO: convert currency
  */
  convertCurrency = (data:any) => {
    const URL = `${ENV.BASE_URL + ENV.CONVERT_CURRENCY}?from=${data.from}&to=${data.to}&amount=${data.amount}`;
    
    return this.connector.Get(URL)
  }

 /* 
  TODO: get chart data
  */
  getChartData = (data:any) => {
    const URL = `${ENV.BASE_URL + ENV.GET_TIME_SERIES_DATA}?base=${data.base}&symbols=${data.symbols}&start_date=${data.start_date}&end_date=${data.end_date}`;

    return this.connector.Get(URL)
  }
}