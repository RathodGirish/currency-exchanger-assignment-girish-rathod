import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-currency-exchanger-detail',
  templateUrl: './currency-exchanger-detail.component.html',
  styleUrls: ['./currency-exchanger-detail.component.css']
})
export class CurrencyExchangerDetailComponent implements OnInit {
 public amount: number = 0;
 public from: string ='';
 public to: string ='';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.amount = params['amount'];
      this.from = params['from'];
      this.to = params['to'];
			console.log("params", params)
		});
  }

}