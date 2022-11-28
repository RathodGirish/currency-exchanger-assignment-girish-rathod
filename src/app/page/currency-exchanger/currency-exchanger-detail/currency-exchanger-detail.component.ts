import { Component, OnInit } from '@angular/core';
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
 public chartObj: any = {};

  constructor(
    private route: ActivatedRoute,
    public currencyExchangerService:CurrencyExchangerService,
    public commonService:CommonService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.amount = params['amount'];
      this.from = params['from'];
      this.to = params['to'];
			console.log("params", params)
		});
    this.fetchChartData()
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
          this.chartObj = {...data}
        } else {
          this.commonService.showFailNotification(CONSTANT.FAIL, CONSTANT.SOMETHING_WENT_WRONG)
        }
      }
    )
  }

}