import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  id: string | null | undefined;
  name: string | null | undefined;

  constructor() { }

  ngOnInit(): void {
   this.id =  localStorage.getItem('userid')
    this.name = localStorage.getItem('username')
  }

}
