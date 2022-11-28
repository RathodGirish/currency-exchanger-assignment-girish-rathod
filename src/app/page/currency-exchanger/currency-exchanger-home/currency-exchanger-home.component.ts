import { Component, OnInit } from '@angular/core';
import { CONSTANT } from "../../../provider/constant";
import { CommonService, CurrencyExchangerService } from "../../../services/index";

@Component({
  selector: 'app-currency-exchanger-home',
  templateUrl: './currency-exchanger-home.component.html',
  styleUrls: ['./currency-exchanger-home.component.css']
})
export class CurrencyExchangerHomeComponent implements OnInit {

  public amount: number = 1;
  public popularCurrency: any[] = [...CONSTANT.CURRENCY_SYMBOL_LIST]
  public popularCurrencyRates: any = {
    "AED": 3.673042,
    "AUD": 1.48125,
    "BTC": 6.0131601e-05,
    "CAD": 1.34015,
    "EGP": 24.534063,
    "EUR": 0.960204,
    "GBP": 0.827061,
    "INR": 81.66995,
    "JPY": 139.12504,
    "SGD": 1.375704
  }

  constructor(
    public commonService: CommonService,
    public currencyExchangerService: CurrencyExchangerService
  ) {
  }

  ngOnInit(): void {
    // this.setCurrencyDataIntoLocal()
  }

  /*
  TODO: method to set currency data into local
  */
  public setCurrencyDataIntoLocal = async () => {
    this.currencyExchangerService.getAllSymbols().subscribe(
      (async (data: any) => {
        if (data && data.success === true) {
          let obj = data.symbols
          let currencyArray = this.commonService.objectToArray(obj)
          this.commonService.setCurrencyIntoLocal(currencyArray)
        }
      })
    );
  }

  /*
  TODO: method to set amount from child
  */
  public onAmountChange = async (event: any) => {
    this.amount = event;
  }

}