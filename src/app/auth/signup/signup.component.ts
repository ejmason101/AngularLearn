import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    isLoading = false;

    levels = ['student','employee','admin'];

    constructor(public authService: AuthService) {}

    onSignup(form: NgForm) {
        console.log(form.value);
        if(form.invalid){
            return;
        }
        this.isLoading = true;
        this.authService.createUser(
            form.value.firstName,
            form.value.lastName,
            form.value.email,
            form.value.password,
            form.value.studentID,
            form.value.phone);
    }
}