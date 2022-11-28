import { Component, OnInit } from '@angular/core';
import { CONSTANT } from "../../../provider/constant";
import { CommonService, CurrencyExchangerService } from "../../../services/index";

@Component({
  selector: 'app-currency-exchanger-home',
  templateUrl: './currency-exchanger-home.component.html',
  styleUrls: ['./currency-exchanger-home.component.css']
})
export class CurrencyExchangerHomeComponent implements OnInit {

  public amount: any = null;
  public popularCurrency: any[] = [...CONSTANT.CURRENCY_SYMBOL_LIST]
  public popularCurrencyRates: any = {}
  convertAmount: any = '';

  constructor(
    public commonService: CommonService,
    public currencyExchangerService: CurrencyExchangerService
  ) {
  }

  ngOnInit(): void { }

  /*
  TODO: method to set amount from child
  */
  public onFormValueChange = async (event: any) => {
    this.amount = event.amount;
    let obj = {
      "base": event.from,
      "symbols": CONSTANT.CURRENCY_SYMBOL_LIST.toString()
    }
    this.fetchLatestSymbols(obj)
  }

  /*
  TODO: method to fetch latest symbols
  */
  public fetchLatestSymbols = async (obj: any) => {
    try{
      this.currencyExchangerService.getLatestSymbols(obj).subscribe(
        (data: any) => {
          if (data && data.success === true) {
            this.popularCurrencyRates = {...data.rates}
          } else {
            this.commonService.showFailNotification(CONSTANT.FAIL, CONSTANT.SOMETHING_WENT_WRONG)
          }
        },
        (e: any) => {
          this.commonService.showFailNotification(CONSTANT.FAIL, e.error.message)
        }
      )
    } catch(e: any) {
      this.commonService.showFailNotification(CONSTANT.FAIL, e)
    }
  }
}