import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainserviceService } from '../service/mainservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private mainservice: MainserviceService, private router: Router) { }

  ngOnInit(): void {
  }

  login(email: any, password: any) {
    let body = {
      email: email,
      password: password
    }
    this.mainservice.login(body).subscribe(
      (res: any) => {
        if (res.status == 1) {
          console.log(res);
          localStorage.setItem('userid', res.data._id)
          localStorage.setItem('username', res.data.name)
          this.router.navigate(['/']);
        }

        if (res.status == 2) {
          console.log(res);
        }

      }
    )
  }

}
