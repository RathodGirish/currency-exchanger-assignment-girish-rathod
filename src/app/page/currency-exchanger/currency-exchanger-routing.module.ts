import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyExchangerComponent } from './currency-exchanger.component';
import { CurrencyExchangerDetailComponent } from './currency-exchanger-detail/currency-exchanger-detail.component';

/* declare route here */
const routes: Routes = [
  { path: "home", component: CurrencyExchangerComponent },
  { path: "detail", component: CurrencyExchangerDetailComponent },
  { path: "detail/:from/:to/:amount", component: CurrencyExchangerDetailComponent },
  { path: '', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyExchangerRoutingModule { }