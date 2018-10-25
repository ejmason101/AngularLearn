import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { AuthData } from "./auth-data.model";
import { LoginData } from "./login-data.model";


@Injectable({
    providedIn: "root"
})
export class AuthService {

    constructor(private http: HttpClient, private router: Router) {}

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
            .post("http://localhost:3000/api/user/login", authData)
                .subscribe(response => {
                    console.log("Auth service loginUser()");
                    console.log(response); // token recieved from successful login
                    
                })
    }
}