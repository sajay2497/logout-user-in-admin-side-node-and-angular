import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainserviceService } from '../service/mainservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id: string | null | undefined;
  name: string | null | undefined;
  allusers: any;

  constructor(private mainservice: MainserviceService, private routes: Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('userid')
    this.name = localStorage.getItem('username')
   
  }

  onget(){
    this.mainservice.alluser().subscribe(
      (res:any) => {
        if(res.status == 0){
          this.routes.navigate(['/login']);
        }
        console.log(res);
        this.allusers = res.data
      }
    )
  }

}
