// create blueprint for an object, never instantiated, angular will use and inst
import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';

import { TodosService } from '../todos.service';

// attach to class to tell angular this is a component1
@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent {
  enteredContent = '';
  enteredTitle = '';
  
  constructor(public todosService: TodosService) {}

  
  onAddTodo(form: NgForm) {
    if(form.invalid)
      return;
        
    this.todosService.addTodo(form.value.title, form.value.content);
    form.resetForm();

  }
}
