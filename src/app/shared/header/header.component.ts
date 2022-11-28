import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /* 
  Method to call when user click on EUR USD details button
  */
  public onEurUsdButtonClick = () : void => {
    this.router.navigate([`/currency-exchanger/detail/EUR/USD`]);
  }
  /* 
  Method to call when user click on EUR GDP details button
  */
  public onEurGbpButtonClick = () : void=> {
    this.router.navigate([`/currency-exchanger/detail/EUR/GBP`]);
  }

}
