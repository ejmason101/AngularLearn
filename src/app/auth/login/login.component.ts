import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@ViewChild('sidenav')
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    isLoading = false;

    public myNav: any;

    private authStatusSub: Subscription;

    // inject so we can use the auth.service.js
    constructor(public authService: AuthService){}

    ngOnInit() {
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
            authStatus => {
                this.isLoading = false;
            }
        ); 

        


    }

    onLogin(form: NgForm) {
        console.log(form.value);
        if(form.invalid) {
            return;
        }
        this.isLoading = true;
        this.authService.loginUser(form.value.email, form.value.password);
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
}