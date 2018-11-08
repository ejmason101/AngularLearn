import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@ViewChild('sidenav')
@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent implements OnInit, OnDestroy {
    isLoading = false;
    
    private authStatusSub: Subscription;
    
    constructor(public authService: AuthService) {}

    ngOnInit() {
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
            authStatus => {
                this.isLoading = false;
            }
        ); 
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
}