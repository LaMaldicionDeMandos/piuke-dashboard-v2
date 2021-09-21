import { Component, OnInit } from '@angular/core';
import {startLoadingIndicator, stopLoadingIndicator} from "@btapai/ng-loading-indicator";
import Chart from 'chart.js';

@Component({
  selector: "app-performance",
  templateUrl: "performance.component.html",
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  startDate;

  public canvas : any;
  public ctx;
  public data: any;
  public myChartData;

  constructor() {}

  ngOnInit() {
    this.canvas = document.getElementById("chartPie");
    this.ctx = this.canvas.getContext("2d");

    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
    var gradientStroke2 = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

    gradientStroke2.addColorStop(1, 'rgba(121,132,16,0.2)');
    gradientStroke2.addColorStop(0.4, 'rgba(121,132,16,0.0)');
    gradientStroke2.addColorStop(0, 'rgba(121,132,16,0)'); //red colors

    var data = {
      labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      datasets: [{
        label: "Data",
        fill: true,
        backgroundColor: [gradientStroke, gradientStroke2],
        borderColor: '#666666',
        borderWidth: 1,
        data: [50, 200, 170, 8, 120, 80],
      }]
    };

    var myChart = new Chart(this.ctx, {
      type: 'pie',
      data: data,
      options: {
        responsive: false,
        legend: {
          display: false,
        }
      }
    });
  }

  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }

  closeDatePicker(eventData: any, dp?:any) {
    console.log("Data: " + eventData);
    this.startDate = eventData;
    //this.getBalance(this.startDate);
    dp.close();
  }

  @stopLoadingIndicator()
  triggerLoadingIndicatorStop() {
    console.log('stopped');
  }
}
