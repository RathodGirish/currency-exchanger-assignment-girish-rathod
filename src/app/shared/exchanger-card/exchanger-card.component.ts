import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService, CurrencyExchangerService } from '../../services/index'
import { CONSTANT } from 'src/app/provider/constant';

@Component({
  selector: 'exchanger-card',
  templateUrl: './exchanger-card.component.html',
  styleUrls: ['./exchanger-card.component.css']
})
export class ExchangerCardComponent implements OnInit {

  @Output() onFormValueChange = new EventEmitter();
  @Input() moreButtonShow: any;
  @Input() cAmount: string = '';
  public currencyList: any[] = []
  public submitted: boolean = false;
  public enableMoreButton: boolean = false;
  public convertAmount: string = "";
  public isDetailScreen: boolean = false;
  currencyExchangerForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    public commonService: CommonService,
    protected currencyExchangerService: CurrencyExchangerService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.isDetailScreen = this.moreButtonShow
    this.commonService.getCurrencyFromLocal((data: any) => {
      if(data && data.length > 0) {
        this.currencyList = [...data]
      } else {
        // this.setCurrencyDataIntoLocal()
      }
    })
    if(this.cAmount) {
      this.convertAmount = this.cAmount
    }
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
  TODO: method to create form for currency
  */
  createForm() {
    this.currencyExchangerForm = this.fb.group({
      amount: ['', Validators.required],
      from: ['EUR', Validators.required],
      to: ['USD', Validators.required]
    });
  }
  get frm() { return this.currencyExchangerForm.controls; }

  /*
  TODO: method to swipe currency
  */
  public onSwipeButtonClick = () => {
    const currencyExchangerFormmData = this.currencyExchangerForm.value;
    this.currencyExchangerForm.patchValue({
      from: currencyExchangerFormmData.to,
      to: currencyExchangerFormmData.from,
    })
  }

  /*
  TODO: call when user click on more details button
  */
  public onMoreDetailButtonClick = () => {
    const formmData = this.currencyExchangerForm.value;
    if (!this.currencyExchangerForm.invalid) {
      this.router.navigate([`/currency-exchanger/detail/${formmData.from}/${formmData.to}/${formmData.amount}`]);
    } else {
      this.commonService.showFailNotification(CONSTANT.FAIL,CONSTANT.INVALID_FORM);
    }
  }

  /*
  TODO: method to return converted value with format
  */
  public getConvertedValue = () => {
    if (this.convertAmount) {
      const formmData = this.currencyExchangerForm.value;
      let value = `${formmData.amount}.00 ${formmData.from}=${this.convertAmount} ${formmData.to}`
      return value.toString()
    }
    return ''
  }

   /*
  TODO: call when user click on converter button
  */
  public onConvertButtonClick = () => {
    const formmData = this.currencyExchangerForm.value;
    if(formmData.from === formmData.to){
      this.commonService.showFailNotification(CONSTANT.FAIL, CONSTANT.SELECT_DIFFERENT_FROM_TO)
      this.enableMoreButton = false;
    } else {
      this.currencyExchangerService.convertCurrency(formmData).subscribe(
        (async (data: any) => {
          if (data && data.success === true) {
            this.onFormValueChange.emit(formmData);
            this.enableMoreButton = true;
            let obj = {
              "base":formmData.to,
              "symbols":CONSTANT.CURRENCY_SYMBOL_LIST.toString()
            }
            this.currencyExchangerService.getLatestSymbols(obj).subscribe(
              (async (data: any) => {
                if (data && data.success === true) {
                  this.convertAmount = data.result;
                 } else {
                  this.commonService.showFailNotification(CONSTANT.FAIL, CONSTANT.SOMETHING_WENT_WRONG)
                }
               })
             )
          } else {
            this.commonService.showFailNotification(CONSTANT.FAIL, CONSTANT.SOMETHING_WENT_WRONG)
          }
        })
      )
    }
  }
}