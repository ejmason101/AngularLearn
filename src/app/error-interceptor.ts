import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ErrorComponent } from "./error/error.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private dialog: MatDialog) {}

    intercept(req: HttpRequest<any>, next: HttpHandler ) {
        // how errors are handled within the app

        // .handle returns obervable stream
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log('error from return data stream');
                let errorMessage = "An unknown error occured!";
                if(error.error.message){
                    errorMessage = error.error.message;
                }

                this.dialog.open(ErrorComponent, {data: {message: errorMessage}});

                // returns observable with and without error
                return throwError(error); // return error observable
            })
        );
    }
}