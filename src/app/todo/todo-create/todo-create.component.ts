// create blueprint for an object, never instantiated, angular will use and inst
import { Component, EventEmitter, Output } from '@angular/core';

import { NgForm } from '@angular/forms';

import { Todo } from '../todo.model';

// attach to class to tell angular this is a component1
@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent {
  // defining class variables
  enteredContent = '';
  enteredTitle = '';
  // newToDo = 'NO CONTENT';

  @Output() todoCreated = new EventEmitter<Todo>();
  

  onAddTodo(form: NgForm) {
    
    if(form.invalid)
      return;
    const todo: Todo = {
      title: form.value.title,
      content: form.value.content
    };

    
    this.todoCreated.emit(todo);


  }
}
