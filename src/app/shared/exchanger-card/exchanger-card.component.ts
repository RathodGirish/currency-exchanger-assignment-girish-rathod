import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';
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
  @Input() moreButtonShow: boolean = false;
  @Input() cAmount: string = '';
  @Input() from: string = '';
  @Input() to: string = '';
  @Input() amount: number = 0;

  public currencyList: any[] = []
  public submitted: boolean = false;
  public enableMoreButton: boolean = false;
  public convertAmount: string = "";
  public convertRate: string = "";
  public isDetailScreen: boolean = false;
  public currencyExchangerForm: FormGroup = new FormGroup({});

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    public commonService: CommonService,
    protected currencyExchangerService: CurrencyExchangerService,
    private router: Router
    ) {
      this.commonService.getCurrencyFromLocal((data: any) => {
        if(data && data.length > 0) {
          this.currencyList = [...data]
        } else {
          this.setCurrencyDataIntoLocal()
        }
      })
      
    }
    
  ngOnInit(): void {
    this.createForm();

    this.isDetailScreen = this.moreButtonShow
    if(this.cAmount) {
      this.convertAmount = this.cAmount
    }
  }

  ngOnChanges(changes: SimpleChanges) : void {
    // changes.prop contains the old and the new value...

    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = chng.currentValue;
      let prev = chng.previousValue;
      if(cur && prev && cur !== prev){
        this.currencyExchangerForm.setValue({ amount: '1', from: 'EUR', to: cur });
        this.cd.detectChanges();
      }
    }
  }

  /*
  Method to set currency data into local
  */
  public setCurrencyDataIntoLocal = () : void => {
    try{

      this.currencyExchangerService.getAllSymbols().subscribe(
        (data: any) => {
          if (data && data.success === true) {
            let obj = data.symbols
            let currencyArray = this.commonService.objectToArray(obj)
            this.currencyList = [...currencyArray]
            this.commonService.setCurrencyIntoLocal(currencyArray)
          }
        },
        (e: any) => {
          this.commonService.showFailNotification(CONSTANT.FAIL, e.error.message)
        }
      );
    } catch(e) {
      this.commonService.showFailNotification(CONSTANT.FAIL, e)
    }
  }

  /*
  Method to create form for currency
  */
  public createForm() : void {
    this.currencyExchangerForm = this.fb.group({
      amount: [this.amount || '1', Validators.required],
      from: [this.from || 'EUR', Validators.required],
      to: [this.to || 'USD', Validators.required]
    });
  }
  get frm() { return this.currencyExchangerForm.controls; }

  /*
  Method to swipe currency
  */
  public onSwipeButtonClick = () : void=> {
    const currencyExchangerFormData = this.currencyExchangerForm.value;
    this.currencyExchangerForm.patchValue({
      from: currencyExchangerFormData.to,
      to: currencyExchangerFormData.from,
    })
  }

  /*
  Method to call when user click on more details button
  */
  public onMoreDetailButtonClick = () : void => {
    const formData = this.currencyExchangerForm.value;
    if (!this.currencyExchangerForm.invalid) {
      this.router.navigate([`/currency-exchanger/detail/${formData.from}/${formData.to}/${formData.amount}`]);
    } else {
      this.commonService.showFailNotification(CONSTANT.FAIL,CONSTANT.INVALID_FORM);
    }
  }

  /*
  Method to return converted value with format
  */
  public getConvertedValue = (rate: string) : string => {
    if (this.convertAmount) {
      const formData = this.currencyExchangerForm.value;
      let value = `1 ${formData.from} = ${rate} ${formData.to}`
      return value.toString()
    }
    return ''
  }

  /*
  Method to call when user click on converter button
  */
  public onConvertButtonClick = () : void => {
    const formData = this.currencyExchangerForm.value;
    if(this.currencyExchangerForm.invalid){
      this.commonService.showFailNotification(CONSTANT.FAIL, CONSTANT.INVALID_FORM)
    } else { 
      if(formData.from === formData.to){
        this.commonService.showFailNotification(CONSTANT.FAIL, CONSTANT.SELECT_DIFFERENT_FROM_TO)
        this.enableMoreButton = false;
      } else {
        this.convertRate = '';
        this.convertAmount = '';
        try{
          
          this.currencyExchangerService.convertCurrency(formData).subscribe(
            (data: any) => {
              if (data && data.success === true) {
                this.onFormValueChange.emit(formData);
                this.enableMoreButton = true;
                
                this.convertAmount = data.result.toString() + ' ' + formData.to;
                this.convertRate = this.getConvertedValue(data.info.rate.toString());
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
  }

  /*
  Method to check calculation value change or not
  */
  public onCalculateValueChange() : void{
    this.enableMoreButton = false;
  }
}