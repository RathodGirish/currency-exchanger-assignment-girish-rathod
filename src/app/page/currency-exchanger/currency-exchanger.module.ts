import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CurrencyExchangerHomeComponent} from './currency-exchanger-home/currency-exchanger-home.component';
import { CurrencyExchangerDetailComponent} from './currency-exchanger-detail/currency-exchanger-detail.component';
import { CommonService, CurrencyExchangerService } from '../../services/index';
import { Connector } from '../../provider/http-common';
import { CurrencyExchangerRoutingModule } from './currency-exchanger-routing.module';
import { ExchangerCardComponent } from '../../shared/exchanger-card/exchanger-card.component';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';

@NgModule({
  declarations: [    
    CurrencyExchangerHomeComponent,
    CurrencyExchangerDetailComponent,
    ExchangerCardComponent,
    LineChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    CurrencyExchangerRoutingModule,
  ],
  providers:[CommonService,CurrencyExchangerService,Connector]
})
export class CurrencyExchangerModule { }
