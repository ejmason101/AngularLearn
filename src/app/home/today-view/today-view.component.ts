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

   private authListenerSubs: Subscription;
   userIsAuthenticated = false;
   userLevel = "default";

    isLoading = false;

    currentDate;
    loggedUserName;
    public myNav: any;

    private authStatusSub: Subscription;
    

    // inject so we can use the auth.service.js
    constructor(public authService: AuthService){}

    ngOnInit() {
       // TODO load the data here and 

	   this.userIsAuthenticated = this.authService.getIsAuth();
    	this.userLevel = this.authService.getUserLevel();
       // setting current date in DD/MM/YY format
		 this.currentDateMMDDYYYY();
		

       // get name of current logged in user
		 this.loggedUserName = this.authService.getUserFullName();
		 console.log("logged user name");
		 console.log(this.loggedUserName);

		 this.authListenerSubs = this.authService
			.getAuthStatusListener()
			.subscribe(isAuthenticated => {
				this.userIsAuthenticated = isAuthenticated;
				this.userLevel = this.authService.getUserLevel();
			});
	  
    }

 

    ngOnDestroy() {
		
	 }
	 
	 currentDateMMDDYYYY() {
      var today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		
		if(dd<10) {
			 dd = Number('0'+dd);
		} 
		
		if(mm<10) {
			 mm = Number('0'+mm);
		}
		this.currentDate = mm + '/' + dd + '/' + yyyy;
	 }
}