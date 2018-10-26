import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

// this component gets loaded when app starts

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fayjones-lrs';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }

}
