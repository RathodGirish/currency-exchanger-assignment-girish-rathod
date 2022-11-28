import { AfterViewInit, Component, ElementRef, ViewChild, Input, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { CommonService} from "../../services/index"
import * as moment from "moment";


interface ChartObj {
  monthYear:string,
  rates: string[]
}

interface ChartData {
  base: string;
  rates: any;
  end_date: string;
  start_date: string;
  success: boolean;
  timeseries: boolean;
}


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements AfterViewInit {
  @Input() chartData: ChartData = {
    base: "",
    end_date: "",
    rates: {},
    start_date: "",
    success: false,
    timeseries: false
  };
  @Input() to: string = "";
  @ViewChild('lineCanvas') lineCanvas: ElementRef | undefined;
  public lineChart: any;
  public isChartShown:Boolean = false

  constructor(
    public commonService: CommonService,
  ) {}

  ngOnInit(): void {
    if(!this.commonService.isObjEmpty(this.chartData['rates'])){
      // this.lineChartMethod();
      this.isChartShown = true;
    } 
  }

  ngAfterViewInit(): void {
    if(this.isChartShown == true){
      this.lineChartMethod();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = chng.currentValue;
      let prev = chng.previousValue;
      if(cur && prev && cur !== prev){
        this.isChartShown = false;
        this.lineChartMethod();
      }
    }
  }

  /*
  * Method to load line chart data. 
  */
  lineChartMethod() : void {
    let months = this.getMonthYearList(this.chartData['start_date'], this.chartData['end_date'])
    let rateData = this.getRateDataList(months)
    if(this.lineChart){
      this.lineChart.destroy();
    }
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
    this.isChartShown = true;
  }

  /*
  * Method to get month list of last 12 month from today. 
  */
  public getMonthYearList(d1:string, d2:string) : string[] {
		let dateStart = moment(d1);
		let dateEnd = moment(d2);
		let timeValues = [];

    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
			timeValues.push(dateStart.format('MMM-YYYY'));
			dateStart.add(1,'month');
		}
		return timeValues;
	}

  /*
  * To get rate value list of last 12 month from today. 
  */
  public getRateDataList(months: string[]) {
    let list: ChartObj[] = months.map((str: string)=>({'monthYear':str,"rates":[]}));
    let rateData:any = [];
    months.forEach((month:string, index:number) => {
      for(const prop in this.chartData['rates']){
		    const dateStart = moment(prop);
        let str = dateStart.format('MMM-YYYY');
        if(str == month){
          list[index]['rates'].push(this.chartData['rates'][prop][this.to])
        }
      }
      let rateIndex = list[index]['rates'].length - 1;
      rateData.push(list[index]['rates'][rateIndex])
    });
    return rateData;
	}
}