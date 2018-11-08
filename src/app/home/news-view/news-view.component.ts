import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NewsService } from '../news.service';
import { News } from '../news.model';



@ViewChild('sidenav')
@Component({
    selector: 'app-news-view',
    templateUrl: './news-view.component.html',
    styleUrls: ['./news-view.component.css']
})
export class NewsView implements OnInit, OnDestroy {
    isLoading = false;

    public myNav: any;

    public userLevel = "default";
    userIsAuthenticated = false;

    news: News[] = [];

    private authStatusSub: Subscription;

    // todos = [
    //     { title: 'First Todo', content: 'First Todo Content '},
    //     { title: 'Second Todo', content: 'Second Todo Content '},
    //     { title: 'Third Todo', content: 'Third Todo Content '}
    // ];

    // inject so we can use the auth.service.js
    constructor(public authService: AuthService,
                public newsService: NewsService ){}

    ngOnInit() {
       // TODO load the data here and
       console.log('app-news-view ngOnInit()');

       this.userLevel = this.authService.getUserLevel();
       this.userIsAuthenticated = this.authService.getIsAuth();

       this.authStatusSub = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
                this.userLevel = this.authService.getUserLevel();
            });

        console.log("news items:");
        this.news = [
            {
                title: "New Ceramic Printer!",
                content: "Check out this link to see the new printer in action!",
                postedDate: "October 29, 2018"
            },
            {
                title: "New Ceramic Printer!",
                content: "Check out this link to see the new printer in action!",
                postedDate: "October 29, 2018"
            },
            {
                title: "New Ceramic Printer!",
                content: "Check out this link to see the new printer in action!",
                postedDate: "October 29, 2018"
            }
        ];
        console.log(this.news);
    }

 

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
}