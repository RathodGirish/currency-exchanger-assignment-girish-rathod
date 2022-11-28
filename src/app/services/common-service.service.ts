import { Injectable } from '@angular/core';
import { CONSTANT } from '../provider/constant';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService) { }

  /* 
  TODO: convert object into array 
  */
  public objectToArray = (obj: any) => {
    return Object.keys(obj).map(a => { return { key: a, value: obj[a] } })
  }

  /* 
  TODO: set currency array into local storage
  */
  public setCurrencyIntoLocal = (arr: any) => {
    localStorage.setItem(CONSTANT.CURRENCY_LIST, JSON.stringify(arr))
  }

  /* 
  TODO: get currency array from local storage
  */
  public getCurrencyFromLocal(callback: any) {
    var val: any = localStorage.getItem(CONSTANT.CURRENCY_LIST);
    var data = JSON.parse(val);
    callback(data);
  };

  /*
  TODO: return only number value
  */
  public numberOnly(event: any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }


  /*
   TODO: display Success message 
   */
   public showSuccessNotification(status:any, message:any) {
     this.toastr.success(message, status, {
         timeOut: 3000
     })
 }

 /*
 TODO: display Fail message 
 */
 public showFailNotification(status:any, message:any) {
     this.toastr.error(message, status, {
         timeOut: 3000
     })
 }
}