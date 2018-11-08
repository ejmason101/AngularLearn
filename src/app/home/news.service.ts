import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject } from 'rxjs';
import { map } from 'rxjs/operators'

import { Router } from "@angular/router";

// import { Todo } from './todo.model';
import { AuthService } from '../auth/auth.service';
import { News } from './news.model';

// allows angjular to see at the root level, and it only creates 1 instance in the entire app
// there would be multiple copies of the todos else
@Injectable({providedIn: 'root'})
export class NewsService {
    
    // holds the list of Todos recieved from the server
    private todos: News[] = [];

    /*
        Services, how angular achieves multicasting
            multicasting is forwarding 'notifications'
            from one obseervable to one or more destination observers
    
    
    */

    private todosUpdated = new Subject<News[]>();

    constructor(
        private http: HttpClient,
        private router: Router,
        private authService: AuthService) {}

    


}