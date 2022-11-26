import { Component, OnInit } from '@angular/core';
import {CONSTANT} from "../../provider/constant";
import {CommonService} from "../../services/index";

@Component({
  selector: 'app-currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrls: ['./currency-exchanger.component.css']
})
export class CurrencyExchangerComponent implements OnInit {

  constructor(public commonService:CommonService) {
  }

  ngOnInit(): void {
    let currencyArray = this.commonService.objectToArray(CONSTANT.CURRENCY_OBJ)
    this.commonService.setCurrencyIntoLocal(currencyArray)
  } 

}