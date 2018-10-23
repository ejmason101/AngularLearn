import { Component } from '@angular/core';

import { Todo } from './todo/todo.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fayjones-lrs';

  storedTodo: Post[] = [];

  onTodoAdded(todo) {
    // add post to parent 
    this.storedTodo.push(todo);
  }
}
