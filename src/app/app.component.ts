import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angularapp';

  constructor(private router:Router){}

  ngOnInit():void{this.router.navigateByUrl('/home');}
}
