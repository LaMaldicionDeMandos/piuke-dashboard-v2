import { Component, OnInit } from '@angular/core';
import {startLoadingIndicator, stopLoadingIndicator} from "@btapai/ng-loading-indicator";
import Chart from 'chart.js';
import * as _ from 'lodash';
import {SalesService} from "../../services/sales.service";
import {Performance} from "../../models/performance";

@Component({
  selector: "app-performance",
  templateUrl: "performance.component.html",
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  startDate;

  private canvas : any;
  private ctx;
  private myChartData;

  performances: Performance[] = [];
  bestSale = 0;
  totalSale = 0;


  constructor(private salesService: SalesService) {}

  ngOnInit() {
    this.getPerformance();
  }

  private updateData = () => {
    this.bestSale = _.head(this.performances).totalProfit;
    const d = _.map(this.performances, 'totalProfit');
    console.log('Profits => ' + d);
    const labels = _.map(this.performances, 'title');
    const colors = _.map(this.performances, (p) => {
      const color = this.ctx.createLinearGradient(0, 230, 0, 50);
      color.addColorStop(1, p.color);
      color.addColorStop(0.4, p.color);
      color.addColorStop(0, p.color);
      return color;
    });

    return {
      labels: labels,
      datasets: [{
        label: "Data",
        fill: true,
        backgroundColor: colors,
        borderColor: '#666666',
        borderWidth: 1,
        data: d,
      }]
    };
  }

  private buildChart() {
    this.canvas = document.getElementById("chartPie");
    this.ctx = this.canvas.getContext("2d");
    console.log('Build chart?');
    this.myChartData = new Chart(this.ctx, {
      type: 'pie',
      data: this.updateData(),
      options: {
        responsive: true,
        legend: {
          position: 'right',
          display: false,
        }
      }
    });
  }

  updateOptions = () => {
    if (this.myChartData) {
      this.myChartData.data.datasets[0].data = this.updateData();
      this.myChartData.update();
    } else {
      this.buildChart();
    }
  }

  @startLoadingIndicator()
  private getPerformance() {
    (!this.startDate
      ? this.salesService.getPerformance()
      : this.salesService.getPerformance(this.startDate.getFullYear(), this.startDate.getMonth() + 1))
        .then(performances => _.orderBy(performances, 'totalProfit', 'desc'))
        .then(performances => this.performances = performances)
        .then(() => this.totalSale = _.chain(this.performances).map('totalProfit').sum().value())
        .then(this.updateOptions)
        .then(this.triggerLoadingIndicatorStop)
        .catch(this.triggerLoadingIndicatorStop)
  }

  closeDatePicker(eventData: any, dp?:any) {
    console.log("Data: " + eventData);
    this.startDate = eventData;
    this.getPerformance();
    dp.close();
  }

  @stopLoadingIndicator()
  triggerLoadingIndicatorStop() {
    console.log('stopped');
  }
}
