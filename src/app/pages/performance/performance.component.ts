import { Component, OnInit } from '@angular/core';
import {startLoadingIndicator, stopLoadingIndicator} from "@btapai/ng-loading-indicator";

@Component({
  selector: "app-performance",
  templateUrl: "performance.component.html",
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  startDate;

  constructor() {}

  ngOnInit() {}

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
