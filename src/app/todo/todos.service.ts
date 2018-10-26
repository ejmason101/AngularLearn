import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject } from 'rxjs';
import { map } from 'rxjs/operators'

import { Router } from "@angular/router";

import { Todo } from './todo.model';
import { AuthService } from '../auth/auth.service';

// allows angjular to see at the root level, and it only creates 1 instance in the entire app
// there would be multiple copies of the todos else
@Injectable({providedIn: 'root'})
export class TodosService {
    
    private todos: Todo[] = [];
    private todosUpdated = new Subject<Todo[]>();

    constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

    getTodos(){
        this.http
            .get<{message: string, todos: any}>(
                'http://localhost:3000/api/todos'
            )
            .pipe(map((todoData) => {
                return todoData.todos.map(todo => {
                    return {
                        title: todo.title,
                        content: todo.content,
                        id: todo._id,
                        creator: todo.creator,
                        deadline: todo.deadline
                    };
                });
            }))
            .subscribe((transformedTodos) => {
                console.log("todos: " + transformedTodos);
                this.todos = transformedTodos;
                this.todosUpdated.next([...this.todos]);
            });
    }

    // returns listen, not emit
    getTodoUpdateListener() {
        return this.todosUpdated.asObservable();
    }

    // get to edit
    getTodo(id: string) {
        return this.http.get<{ 
            _id: string;
             title: string;
              content: string;
              deadline: Date;
              creator: string;
            }>(
            'http://localhost:3000/api/todos/' + id
            );
    }

    addTodo(title: string, content: string, deadline: Date) {
        console.log('todos.service addTodo');
        const todo: Todo = {
            id: null,
             title: title,
              content: content,
               deadline: deadline,
               creator: null
            };
        console.log(todo);

        this.http
            .post<{message: string, postId: string}>('http://localhost:3000/api/todos', todo)
            .subscribe((responseData) => {
                const id = responseData.postId;
                todo.id = id;
                this.todos.push(todo);

                this.todosUpdated.next([...this.todos]);
                this.router.navigate(["/"]);

            });
    }

    updateTodo(id: string, title: string, content: string, deadline: Date) {
        const todo: Todo = { 
            id: id,
             title: title,
              content: content,
               deadline: deadline,
               creator: this.authService.getUserId()
            };
        console.log('updateTodo');
        this.http
        .put("http://localhost:3000/api/todos/" + id, todo)
        .subscribe(response => {
            // update local posts
            const updatedTodos = [...this.todos];
            const oldTodoIndex = updatedTodos.findIndex(t => t.id === id);
            updatedTodos[oldTodoIndex] = todo;
            this.todos = updatedTodos;
            
            this.todosUpdated.next([...this.todos]);
            this.router.navigate(["/"]);
        });
    }

    deleteTodo(todoId: string) {
        var urlString = "http://localhost:3000/api/todos/" + todoId;
        console.log(urlString);
        this.http.delete(urlString)
            .subscribe(() => {
                console.log('http delete request finished');
                // keep the elements that are not the same id
                const updatedTodos = this.todos.filter(todo => todo.id !== todoId );
                this.todos = updatedTodos;
                console.log('updated todos list: ' + this.todos);

                this.todosUpdated.next([...this.todos]);
            })
    }


}