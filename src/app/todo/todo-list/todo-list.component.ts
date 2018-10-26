import { Component, Input, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from 'rxjs';

import { Todo } from '../todo.model';
import { TodosService } from "../todos.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit, OnDestroy {
    // todos = [
    //     { title: 'First Todo', content: 'First Todo Content '},
    //     { title: 'Second Todo', content: 'Second Todo Content '},
    //     { title: 'Third Todo', content: 'Third Todo Content '}
    // ];
    
    
    todos: Todo[] = [];
    isLoading = false;

    userIsAuthenticated = false;
    userId: string;

    /*
        Listeners for 
            1. todosSub -- Changes to the Todos being displayed
            2. authStatusSub -- Changes in Loggedin Status
    */
    private todosSub: Subscription;
    private authStatusSub: Subscription;

    constructor(public todosService: TodosService, private authService: AuthService) {}
    
    ngOnInit(){
        this.isLoading = true;
        this.todosService.getTodos();        
        this.userId = this.authService.getUserId();

        // runs whenever the todosService gets updated
        this.todosSub = this.todosService.getTodoUpdateListener()
            .subscribe((todos: Todo[]) => {
                this.isLoading = false;
                this.todos = todos;
            });
        this.userIsAuthenticated = this.authService.getIsAuth();
        
        // runs whenever the authService state changes
        this.authStatusSub = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
                this.userId = this.authService.getUserId();
            });
    }

    onDelete(todoId: string) {
        this.todosService.deleteTodo(todoId);
    }

    ngOnDestroy(){
        this.todosSub.unsubscribe();

        this.authStatusSub.unsubscribe();
    }

}