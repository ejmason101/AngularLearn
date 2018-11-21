import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';





@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit, OnDestroy {

    // =========== Class Memebers
    displayedColumns: string[] = ['select', 'Student ID', 'First Name', 'Last Name', 'Email', 'User Level'];

    userTableData: User[] = []; // stores the basic user model for the user table
    userDataSource;
    resultsLength = 0;
    private userSub: Subscription;
    checked;

    selection = new SelectionModel<User>(true, []);
    selectionLength = Selection.length;

    constructor(
        public userService: UserService
    ){}

    ngOnInit() {
        // get list of all users to search from
        this.userService.getUsers(); // prompts the userService to request the users from server
        this.userSub = this.userService.getUserUpdateListener()
            .subscribe((users: User[]) => {
                console.log('looading users to table');
                this.userTableData = users;
                this.userDataSource = new MatTableDataSource(this.userTableData);
                this.resultsLength = this.userTableData.length;
                
            })
        

    }

    // ============ FILTER for searching within user table
    applyFilter(filterValue: string) {
        this.userDataSource.filter = filterValue.trim().toLowerCase();
    }

    loadUserForEdit(){
        console.log('load user details into edit view:');
    }

    ngOnDestroy() {

    }

     /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    // console.log('checking if all rows are sleected');
    const numSelected = this.selection.selected.length;
    const numRows = this.userDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.userDataSource.data.forEach(row => this.selection.select(row));
  }
}