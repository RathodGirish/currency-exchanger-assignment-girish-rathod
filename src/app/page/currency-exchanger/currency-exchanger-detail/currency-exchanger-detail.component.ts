import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CurrencyExchangerService, CommonService } from '../../../services/index';
import * as moment from 'moment' 
import { CONSTANT } from 'src/app/provider/constant';

interface Chart {
  base:string,
  rates: {
    [key: string]: {[key: string]:string}
  },
  end_date: string,
  start_date:string,
  success:boolean,
  timeseries:boolean
}

@Component({
  selector: 'app-currency-exchanger-detail',
  templateUrl: './currency-exchanger-detail.component.html',
  styleUrls: ['./currency-exchanger-detail.component.css']
})
export class CurrencyExchangerDetailComponent implements OnInit {
  public amount: number = 0;
  public from: string ='';
  public to: string ='';
  public chartData: Chart = {
    base: '',
    rates: {},
    end_date: '',
    start_date: '',
    success: false,
    timeseries: false
  };
  public currencyList: Array<{ key: string; value: string }> = []
  public currencyFullName:string = "";

  constructor(
    private route: ActivatedRoute,
    public commonService: CommonService,
    public currencyExchangerService:CurrencyExchangerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.amount = params['amount'];
      this.from = params['from'];
      this.to = params['to'];
		});
    this.fetchChartData()
    this.currentCurrencyFullName();
  }

  public fetchChartData = () : void => {
    let obj = {
      "start_date": (moment().subtract(1, 'year').add(1, 'M').startOf("month").format("YYYY-MM-DD")).toString(),
      "end_date" : (moment().format("YYYY-MM-DD")).toString(),
      "base" : this.from,
      "symbols" : this.to,
    }

    try{
      this.currencyExchangerService.getChartData(obj).subscribe(
        (data: any) => {
          if (data && data.success === true) {
            this.chartData = {...data}
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
  
  public currentCurrencyFullName = () : void => {
    this.commonService.getCurrencyFromLocal((data: any) => {
      this.currencyList = [...data]
      let obj = this.currencyList.find((a:any) => a.key == this.from)
      if(obj) this.currencyFullName = obj['value'];
    })
  }

  public onGoToHomeClick = () : void => {
    this.router.navigate([`/currency-exchanger/home`]);
  }
}