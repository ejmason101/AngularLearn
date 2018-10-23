import { Component, Input } from "@angular/core";

import { Todo } from '../todo.model';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent {
    // todos = [
    //     { title: 'First Todo', content: 'First Todo Content '},
    //     { title: 'Second Todo', content: 'Second Todo Content '},
    //     { title: 'Third Todo', content: 'Third Todo Content '}
    // ];
    
    
    @Input() todos: Todo[] = [];




}