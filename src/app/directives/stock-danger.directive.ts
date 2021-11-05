import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appStockDanger]'
})
export class StockDangerDirective implements OnInit{
  @Input() appStockDanger = 1;
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    let color = '#2dce89';
    if (this.appStockDanger < 1 && this.appStockDanger >= 0.5) color = 'yellow';
    if (this.appStockDanger < 0.5 && this.appStockDanger >= 0.25) color = 'orange';
    if (this.appStockDanger < 0.25) color = 'red';
    this.el.nativeElement.style.borderLeftColor = color;
  }
}
