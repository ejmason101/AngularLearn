import { Component, Input, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from 'rxjs';

import { Todo } from '../todo.model';
import { TodosService } from "../todos.service";

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
    private todosSub: Subscription;

    constructor(public todosService: TodosService) {}
    
    ngOnInit(){
        this.todosService.getTodos();
        this.todosSub = this.todosService.getTodoUpdateListener()
            .subscribe((todos: Todo[]) => {
                this.todos = todos;
            });

            // doesn't destroy when the component is not part of the DOM
            // source of memory leak
        // this.todosService.getTodoUpdateListener()
        //     .subscribe((todos: Todo[])=> {
        //         this.todos = todos;
        //     });
    }

    onDelete(todoId: string) {
        this.todosService.deleteTodo(todoId);
    }

    ngOnDestroy(){
        this.todosSub.unsubscribe();
    }

}