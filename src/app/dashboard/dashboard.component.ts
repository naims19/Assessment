import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService, barchart, table } from '../_services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    result: any;
    c: any
    barNo: any;
    barName: any;
    chart: any = []
    tableData!: table[]
    BarChart!: barchart[]

    bar = []

  constructor(
    private route: Router,
    private token: TokenStorageService,
    private service: AuthService) {
    
    Chart.register(...registerables);
   }

  ngOnInit(): void {

    // this is for viewing data in the chart
    this.service.chartData().subscribe({
      next: data => {
        this.result = data;
        console.log(this.result)

        this.barNo = this.result.chartBar.map((chartBar: any) => chartBar.value)
        this.barName = this.result.chartBar.map((chartBar: any) => chartBar.name)

        console.log(this.barNo, this.barName);
      }
    })

    // this.service.chartData().subscribe((res) => {
    //   this.BarChart = res.map((c) => {
    //     return{
    //       id: c.payload.doc.id,
    //       ...c.payload.doc.data() as barchart
    //     };
    //   })
    //   console.log(this.tableData);
    //   this.BarChart.forEach(cat => {
    //     this.bar.push(cat.name);
    //   })
    // });


    // This is for viewing data in table
    this.service.getTableData().subscribe(data=>{
      this.result = data

      this.tableData = this.result.tableUsers;
      console.log(this.tableData)
    })

  // This is for chart
  const myChart = new Chart("myChart", {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [25, 22, 29, 8],
            backgroundColor: [
                '#7F8487',
                '#7D9D9C',
                '#D3CEDF',
                '#F0EBE3',
                '#0000'
            ],
            hoverOffset: 4
        }]
    }
});

this.chart = new Chart("myChart2", {
  type: 'bar',
  data: {
      labels: ['Bar 1','Bar 2','Bar 3','Bar 4','Bar 5','Bar 6',],
      datasets: [{
          label: '',
          data: [30, 60, 56, 27, 5, 29],
          backgroundColor: [
              '#7F8487',
              '#7F8487',
              '#7F8487',
              '#7F8487',
              '#7F8487',
              '#7F8487'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});

  }
  
  // this is for logout
  logout() : void {
    this.token.signOut();
    window.location.reload()
    this.route.navigate(['/sign-in'])
  }

}
