import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: [
  ]
})
export class GraficoDonaComponent implements OnInit {
  // Doughnut
  @Input() public chartLabels: string[] = [];
  @Input() public chartData: number[] = [];
  @Input() public chartType: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
