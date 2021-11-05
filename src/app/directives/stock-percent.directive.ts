import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appStockPercent]'
})
export class StockPercentDirective implements OnInit{
  @Input() appStockPercent = 1;
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    let color = '#2dce89';
    if (this.appStockPercent < 1 && this.appStockPercent >= 0.5) color = 'yellow';
    if (this.appStockPercent < 0.5 && this.appStockPercent >= 0.25) color = 'orange';
    if (this.appStockPercent < 0.25) color = 'red';
    this.el.nativeElement.setAttribute('style', `color: ${color} !important`);
  }
}
