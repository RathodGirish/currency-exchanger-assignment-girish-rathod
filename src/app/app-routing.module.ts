import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'currency-exchanger', loadChildren: () => import('./page/currency-exchanger/currency-exchanger.module').then(m => m.CurrencyExchangerModule)  },
  { path: '**', redirectTo: 'currency-exchanger' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }