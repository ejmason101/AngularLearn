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
    private todosSub: Subscription;

    // add listener
    private authStatusSub: Subscription;

    constructor(public todosService: TodosService, private authService: AuthService) {}
    
    ngOnInit(){
        this.isLoading = true;
        this.todosService.getTodos();        

        this.todosSub = this.todosService.getTodoUpdateListener()
            .subscribe((todos: Todo[]) => {
                this.isLoading = false;
                this.todos = todos;
            });
        this.userIsAuthenticated = this.authService.getIsAuth();
        
        this.authStatusSub = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
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