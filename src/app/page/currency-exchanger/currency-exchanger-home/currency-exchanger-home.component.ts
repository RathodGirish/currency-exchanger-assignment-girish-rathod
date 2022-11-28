import { Component, OnInit } from '@angular/core';
import { CONSTANT } from "../../../provider/constant";
import { CommonService, CurrencyExchangerService } from "../../../services/index";

interface FormValues {
  from:string,
  to:string,
  amount:string,
}

interface LatestRequestObj {
  base: string, 
  symbols: string
}

@Component({
  selector: 'app-currency-exchanger-home',
  templateUrl: './currency-exchanger-home.component.html',
  styleUrls: ['./currency-exchanger-home.component.css']
})
export class CurrencyExchangerHomeComponent implements OnInit {

  public amount: number = 0;
  public popularCurrency: string[] = [...CONSTANT.CURRENCY_SYMBOL_LIST]
  public popularCurrencyRates: any = {}
  convertAmount: string = '';

  constructor(
    public commonService: CommonService,
    public currencyExchangerService: CurrencyExchangerService
  ) {
  }

  ngOnInit(): void { }

  /*
  Method to set amount from child
  */
  public onFormValueChange = (event: FormValues) : void => {
    this.amount = parseInt(event.amount);
    let obj = {
      "base": event.from,
      "symbols": CONSTANT.CURRENCY_SYMBOL_LIST.toString()
    }
    this.fetchLatestSymbols(obj)
  }

  /*
  Method to fetch latest symbols
  */
  public fetchLatestSymbols = (obj: LatestRequestObj) :void => {
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
    } catch(e) {
      this.commonService.showFailNotification(CONSTANT.FAIL, e)
    }
  }
}