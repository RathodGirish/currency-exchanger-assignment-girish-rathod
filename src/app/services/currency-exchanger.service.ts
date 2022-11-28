import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../provider/http-interceptor';
import { environment as ENV } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangerService {

  constructor(public httpInterceptor: HttpInterceptor) { }

  /* 
  API to get all symbols
  */
  getAllSymbols = () => {
    const URL = `${ENV.BASE_URL}symbols?access_key=${ENV.API_KEY}`;
    return this.httpInterceptor.Get(URL)
  }

  /* 
  API to get latest symbols
  */
  getLatestSymbols = (data:any) => {
    const URL = `${ENV.BASE_URL}latest?base=${data.base}&symbols=${data.symbols.toString()}`;

    return this.httpInterceptor.Get(URL)
  }

  /* 
  API to convert currency
  */
  convertCurrency = (data:any) => {
    const URL = `${ENV.BASE_URL}convert?from=${data.from}&to=${data.to}&amount=${data.amount}`;
    
    return this.httpInterceptor.Get(URL)
  }

  /* 
  API to get chart data
  */
  getChartData = (data:any) => {
    const URL = `${ENV.BASE_URL}timeseries?base=${data.base}&symbols=${data.symbols}&start_date=${data.start_date}&end_date=${data.end_date}`;

    return this.httpInterceptor.Get(URL)
  }
}