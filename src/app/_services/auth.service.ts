import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom, lastValueFrom, map  } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://test-demo.aemenersol.com/api/account/login';
const API_URL = 'http://test-demo.aemenersol.com/api/dashboard';

export interface table{
  firstName: String,
  lastName: String,
  username: String
}

export interface barchart{
  name: string,
  value: number
}

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    // 'X-My-custom-Header': '${apiToken}',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGFlbWVuZXJzb2wuY29tIiwianRpIjoiMmI5ZmE0NjktNjcwYS00Y2Y5LTkzNWItN2NkZmJiOTlmMTRkIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIzMzE4ZTcxMC05MzAzLTQ4ZmQtODNjNS1mYmNhOTU0MTExZWYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNjY4MjIxNDY1LCJpc3MiOiJodHRwOi8vdGVzdC1kZW1vLmFlbWVuZXJzb2wuY29tIiwiYXVkIjoiaHR0cDovL3Rlc3QtZGVtby5hZW1lbmVyc29sLmNvbSJ9._eKjcLPSnE1JovC2K1cIqzuBr87OnZa5Y1WbSjYxjzQ',
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json'
  })
  };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) { }

  // this is for login
  login(username: string, password: string): Observable<any>{
    return this.http.post(AUTH_API, {
      username,
      password
    }, httpOptions);
  }

  // this is for chart
  chartData(): Observable<any>{
    return this.http.get(API_URL, httpOptions)
  }

  getTableData(): Observable<any>{
    return this.http.get(API_URL,httpOptions);
  }


}
