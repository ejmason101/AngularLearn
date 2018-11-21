import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject } from 'rxjs';
import { map } from 'rxjs/operators'


// import { Todo } from './todo.model';
import { User } from '../auth/user.model';

@Injectable({providedIn: 'root'})
export class UserService {
    private users: User[] = []; // maybe use typescript with new model?

    private usersUpdated = new Subject<User[]>();

    constructor(
        private http: HttpClient) {}

    getUserUpdateListener(){
        return this.usersUpdated.asObservable();
    }
    
    getUsers(){
        this.http
            .get<{message: string, result: any}>('http://localhost:3000/api/user')
            .pipe(map((userData) => {
                console.log("userData:");
                console.log(userData);
                return userData.result.map(userProfile => {
                    return {
                        userId: userProfile._id,
                        studentID: userProfile.studentID,
                        firstname: userProfile.firstname,
                        lastname: userProfile.lastname,
                        email: userProfile.email,
                        userLevel: userProfile.userLevel
                    };
                });
            }))
            .subscribe((transformedNews) => {
                console.log("News: ");
                console.log(transformedNews);

                // set the news stored in instance of this service
                this.users = transformedNews;
                // push out copy of the news to all listening components
                this.usersUpdated.next([...this.users]);
            })
    }

    
}