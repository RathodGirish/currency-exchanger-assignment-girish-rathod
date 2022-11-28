import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CONSTANT } from "../../../provider/constant";
import { CommonService } from '../../../services/index'

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.chartData = CONSTANT.CHART_OBJ;
    this.route.params.subscribe(params => {
      this.amount = params['amount'];
      this.from = params['from'];
      this.to = params['to'];
		});
    this.currentCurrencyName();
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