import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {

  constructor(private http: HttpClient) { }

  readonly Apiurl = 'http://localhost:3000/'

  login(body: any) {
    return this.http.post(this.Apiurl + 'login', body)
  }
  check(body:any){
    return this.http.post(this.Apiurl + 'logincheck', body);
  }
  alluser(){
    return this.http.get(this.Apiurl + 'alluser');
  }
}
