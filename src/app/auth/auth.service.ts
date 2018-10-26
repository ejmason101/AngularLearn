import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { AuthData } from "./auth-data.model";
import { LoginData } from "./login-data.model";
import { Subject } from "rxjs";


@Injectable({
    providedIn: "root"
})
export class AuthService {

    private token: string;
    private isAuthenticated = false; 
    private tokenTimer: NodeJS.Timer; // change to any if it complaigns

    // use subject to push auth info to compoinents that are interested
    private authStatusListener = new Subject<boolean>(); // is the user authed or not

    constructor(private http: HttpClient, private router: Router) {}

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getToken() {
        return this.token;
    }

    createUser(firstname: string,lastname: string,
          email: string,
           password: string,
            studentID: string,
             phone: string) {
        
        const authData: AuthData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            studentID: studentID,
            phone: phone
        }
        
        // send request
        this.http
            .post<{message: string}>("http://localhost:3000/api/user/signup", authData)
            .subscribe(response => {
                console.log('auth service createUser')
                console.log(response);
            });
    } // end create user

    loginUser( email: string, password: string) {
        const authData: LoginData = {
            email: email,
            password: password
        }
        
        this.http
            .post<{token: string, expiresIn: number}>("http://localhost:3000/api/user/login", authData)
                .subscribe(response => {
                    console.log("Auth service loginUser()");
                    console.log(response); // token recieved from successful login
                    const token = response.token;
                    this.token = token;
                    if (token) {
                        const expiresInDuration = response.expiresIn;
                        console.log('token ttl: ' + expiresInDuration);
                        this.isAuthenticated = true;
                        this.authStatusListener.next(true); // inform everyone
                        
                        // sets token timer
                        this.setAuthTimer(expiresInDuration);

                        // saves AuthData to local storage
                        const now = new Date();
                        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                        this.saveAuthData(token, expirationDate);
                        this.router.navigate(['/']);
                    }  
                });
    }

    // tries to auth user using local storage
    autoAuthUser() {
        const authInformation = this.getAuthData();
        if(!authInformation) {
            // no stored info
            return;
        }

        // check if the token is still valid
        const now = new Date();
        console.log("Current Date() at autoAuth: ");
        console.log(now);
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        // check if date is in the FuTuRe
        console.log("autoAuthUser()");
        console.log(authInformation, expiresIn);

        if(expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn/1000);
            this.authStatusListener.next(true); // tell everyone auth is successful

        }
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        // update all intresed items
        this.authStatusListener.next(false);
        // redirect to homepage

        // clears token timer when logged out manually
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    // to save token to browser localStorage to presist data
    private saveAuthData(token: string, expirationDate: Date ) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');

        if ( !token || !expirationDate) {
            return;
        }
        // if ;they exist
        return {
            token: token,
            expirationDate: new Date(expirationDate)
        }
    }

    private setAuthTimer(duration: number) {
        console.log("Setting time: " + duration);

        this.tokenTimer = setTimeout(() => {
            // clear token when it expires
            this.logout();
        }, duration * 1000);
    }
}