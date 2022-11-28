import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CurrencyExchangerService, CommonService } from '../../../services/index';
import * as moment from 'moment' 
import { CONSTANT } from 'src/app/provider/constant';

@Component({
  selector: 'app-currency-exchanger-detail',
  templateUrl: './currency-exchanger-detail.component.html',
  styleUrls: ['./currency-exchanger-detail.component.css']
})
export class CurrencyExchangerDetailComponent implements OnInit {
 public amount: number = 0;
 public from: string ='';
 public to: string ='';
 public chartData: any;
 public currencyList: any[] = []
 public currencyName:any = "";
  constructor(
    private route: ActivatedRoute,
    public commonService: CommonService,
    public currencyExchangerService:CurrencyExchangerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.chartData = CONSTANT.CHART_OBJ;
    this.route.params.subscribe(params => {
      this.amount = params['amount'];
      this.from = params['from'];
      this.to = params['to'];
		});
    this.fetchChartData()
    this.currentCurrencyName();
  }

  public fetchChartData = () => {
    let obj = {
      "start_date": (moment().add(1, 'M').startOf("month").format("YYYY-MM-DD")).toString(),
      "end_date" : (moment().subtract(1, 'M').endOf("month").format("YYYY-MM-DD")).toString(),
      "base" : this.from,
      "symbols" : this.to,
    }

    this.currencyExchangerService.getChartData(obj).subscribe(
      (data: any) => {
        if (data && data.success === true) {
          this.chartData = {...data}
        } else {
          this.commonService.showFailNotification(CONSTANT.FAIL, CONSTANT.SOMETHING_WENT_WRONG)
        }
      }
    )
  }
  
  public currentCurrencyName () {
    this.commonService.getCurrencyFromLocal((data: any) => {
      this.currencyList = [...data]
      let obj = this.currencyList.find((a:any) => a.key == this.from)
      if(obj) this.currencyName = obj['value'];
    })
  }

  public onGoToHomeClick = () => {
    this.router.navigate([`/currency-exchanger/home`]);
  }
}