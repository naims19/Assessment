import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    currentUser: any;

  constructor(private route: Router,
              private token: TokenStorageService) {
    Chart.register(...registerables);
   }

  ngOnInit(): void {

    this.currentUser = this.token.getUser();
    console.log(this.currentUser)

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

const myChart2 = new Chart("myChart2", {
  type: 'bar',
  data: {
      labels: ['Bar 1', 'Bar 2', 'Bar 3', 'Bar 4', 'Bar 5', 'Bar 6'],
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

  logout() : void {
    window.sessionStorage.clear();
    this.route.navigate(['sign-in'])
  }

}
