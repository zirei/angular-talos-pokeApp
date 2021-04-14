// import { Component, ViewChild } from "@angular/core";

// import {
//   ChartComponent,
//   ApexAxisChartSeries,
//   ApexChart,
//   ApexXAxis,
//   ApexTitleSubtitle
// } from "ng-apexcharts";

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   title: ApexTitleSubtitle;
// };

// @Component({
//   selector: 'app-chart',
//   templateUrl: './chart.component.html',
//   styleUrls: ['./chart.component.css'],
// })
// export class ChartComponent implements OnInit {
//   @ViewChild("chart") chart: ChartComponent;
//   public chartOptions: Partial;

//   constructor() {
//     this.chartOptions = {
//       series: [
//         {
//           name: "My-series",
//           data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
//         }
//       ],
//       chart: {
//         height: 350,
//         type: "bar"
//       },
//       title: {
//         text: "My First Angular Chart"
//       },
//       xaxis: {
//         categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
//       }
//     };
//   }
// }

import { Component, OnInit } from '@angular/core';
import { productSales, productSalesMulti} from './data'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {

  productSales: any[] = []
  productSalesMulti: any[] = []

  constructor(){
    Object.assign(this, {productSales, productSalesMulti})
  }
  
  ngOnInit() {}
}



// // works
// import { Component, OnInit } from '@angular/core';
// import { Chart } from 'node_modules/chart.js'

// @Component({
//   selector: 'app-chart',
//   templateUrl: './chart.component.html',
//   styleUrls: ['./chart.component.css'],
// })
// export class ChartComponent implements OnInit {

//   constructor(){}
  
//   ngOnInit() {
//     let myChart = new Chart("myChart", {
//       type: 'bar',
//       data: {
//           labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//           datasets: [{
//               label: '# of Votes',
//               data: [12, 19, 3, 5, 2, 3],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.2)',
//                   'rgba(54, 162, 235, 0.2)',
//                   'rgba(255, 206, 86, 0.2)',
//                   'rgba(75, 192, 192, 0.2)',
//                   'rgba(153, 102, 255, 0.2)',
//                   'rgba(255, 159, 64, 0.2)'
//               ],
//               borderColor: [
//                   'rgba(255, 99, 132, 1)',
//                   'rgba(54, 162, 235, 1)',
//                   'rgba(255, 206, 86, 1)',
//                   'rgba(75, 192, 192, 1)',
//                   'rgba(153, 102, 255, 1)',
//                   'rgba(255, 159, 64, 1)'
//               ],
//               borderWidth: 1
//           }]
//       },
//       options: {
//           scales: {
//               y: {
//                   beginAtZero: true
//               }
//           }
//       }
//   });

//   }

//   shuffleData(){

//   }
// }



// import { Component, OnInit } from '@angular/core';
// // import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
// // // import * as pluginDataLabels from 'chartjs-plugin-datalabels';
// // import { Label } from 'ng2-charts';

// @Component({
//   selector: 'app-chart',
//   templateUrl: './chart.component.html',
//   styleUrls: ['./chart.component.css'],
// })
// export class ChartComponent implements OnInit{

//   constructor
//   let ctx= document.getElementById('myChart').getContext('2d');

// // }

// import { Component, Input, OnInit } from '@angular/core';
// import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
// import { Label } from 'ng2-charts';

// @Component({
//   selector: 'app-chart',
//   templateUrl: './chart.component.html',
//   styleUrls: ['./chart.component.css']
// })
// export class ChartComponent implements OnInit {
//   @Input() stats:any;
  
//   public barChartOptions: ChartOptions = {
//     responsive: true,
//     // We use these empty structures as placeholders for dynamic theming.
//     scales: { xAxes: [{}], 
//               yAxes: [{
//                 ticks: {
//                   min: 0,
//                   suggestedMax: 150,
//                 }
//               }] },
    
//   };
  
//   public barChartLabels: Label[] = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];

//   public barChartType: ChartType = 'bar';

//   public barChartLegend = true;

//   public barChartPlugins = [pluginDataLabels];

//   constructor() { }

//   ngOnInit(): void {
    
//   }

//   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
//     console.log(event, active);
//   }

//   public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
//     console.log(event, active);
//   }
// }
