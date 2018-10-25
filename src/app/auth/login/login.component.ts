import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    isLoading = false;

    // inject so we can use the auth.service.js
    constructor(public authService: AuthService){}

    onLogin(form: NgForm) {
        console.log(form.value);
        if(form.invalid) {
            return;
        }

        this.authService.loginUser(form.value.email, form.value.password);
    }
}