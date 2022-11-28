import { AfterViewInit, Component, ElementRef, ViewChild, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import * as moment from "moment";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements AfterViewInit {
  @Input() chartData:any;
  @ViewChild('lineCanvas') lineCanvas: ElementRef | undefined;
  lineChart: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.lineChartMethod();
  }

  lineChartMethod() {
    let months = this.getMonthYearList(new Date(this.chartData['start_date']),new Date(this.chartData['end_date']))
    let rateData = this.getRateDataList(months)
    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Rate',
          //  lineTension: 0.2, 
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: rateData,
            spanGaps: false,
          },
        ],
      },
    });
  }

  public getMonthYearList(d1:any, d2:any) {
		let dateStart = moment(d1);
		let dateEnd = moment(d2);
		let timeValues = [];

    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
			timeValues.push(dateStart.format('MMM-YYYY'));
			dateStart.add(1,'month');
		}
		return timeValues;
	}

  public getRateDataList(months:any) {
    let list = months.map((str:any,index:any)=>({'monthYear':str,"rates":[]}));
    let rateData:any = [];
    months.forEach((month:any,index:any) => {
      for(const prop in this.chartData['rates']){
		    const dateStart = moment(prop);
        let str = dateStart.format('MMM-YYYY');
        if(str == month){
          list[index]['rates'].push(this.chartData['rates'][prop]['EUR'])
        }
      }
      let rateIndex = list[index]['rates'].length - 1;
      rateData.push(list[index]['rates'][rateIndex])
    });
    return rateData;
	}
}