import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CommonService} from '../../services/index'

@Component({
  selector: 'exchanger-card',
  templateUrl: './exchanger-card.component.html',
  styleUrls: ['./exchanger-card.component.css']
})
export class ExchangerCardComponent implements OnInit {

  @Input() moreButtonShow:any;
  public currencyList: any[] = []
  public submitted: boolean = false;
  currencyExchangerForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, public commonService: CommonService, private router: Router) {
    this.createForm();
   }

  ngOnInit(): void {
    this.commonService.getCurrencyFromLocal((data: any) =>{
      this.currencyList = [...data]
      console.log("list", this.currencyList)
    })
  }

  createForm() {
		this.currencyExchangerForm = this.fb.group({
			amount: ['', Validators.required],
			from: ['EUR', Validators.required],
			to: ['USD', Validators.required]			
		});
	}
  get frm() { return this.currencyExchangerForm.controls; }

  public onExchangerClick = () => {
    const currencyExchangerFormmData = this.currencyExchangerForm.value;
    this.currencyExchangerForm.patchValue({
      from: currencyExchangerFormmData.to,
      to: currencyExchangerFormmData.from,
    })
  }
  public onMoreDetails = () => {
    const formmData = this.currencyExchangerForm.value;
    console.log(this.currencyExchangerForm.invalid)
    if(!this.currencyExchangerForm.invalid) {
      this.router.navigate([`/currency-exchanger/detail/${formmData.from}/${formmData.to}/${formmData.amount}`]);
    } else {
      alert("Invalid form value");
    }
  }
  
}
