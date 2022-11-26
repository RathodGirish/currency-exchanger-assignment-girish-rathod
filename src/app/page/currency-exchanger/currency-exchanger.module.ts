import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CurrencyExchangerComponent} from './currency-exchanger.component';
import { CurrencyExchangerDetailComponent} from './currency-exchanger-detail/currency-exchanger-detail.component';
import { CommonService } from '../../services/index';

import { CurrencyExchangerRoutingModule } from './currency-exchanger-routing.module';


@NgModule({
  declarations: [    
    CurrencyExchangerComponent,
    CurrencyExchangerDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    CurrencyExchangerRoutingModule
  ],
  providers:[CommonService]
})
export class CurrencyExchangerModule { }
