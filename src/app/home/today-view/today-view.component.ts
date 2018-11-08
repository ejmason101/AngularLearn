import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@ViewChild('sidenav')
@Component({
    selector: 'app-today-view',
    templateUrl: './today-view.component.html',
    styleUrls: ['./today-view.component.css']
})
export class TodayView implements OnInit, OnDestroy {
    isLoading = false;

    public myNav: any;

    private authStatusSub: Subscription;
    

    // inject so we can use the auth.service.js
    constructor(public authService: AuthService){}

    ngOnInit() {
       // TODO load the data here and 
    }

 

    ngOnDestroy() {

    }
}