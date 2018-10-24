// create blueprint for an object, never instantiated, angular will use and inst
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { TodosService } from '../todos.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Todo } from '../todo.model';

// attach to class to tell angular this is a component1
@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {
  enteredContent = "";
  enteredTitle = "";
  todo: Todo;
  isLoading = false;
  private mode = 'create';
  private todoId: string;

  
  constructor(
    public todosService: TodosService,
     public route: ActivatedRoute
  ) {}

  // runs when component is rendered
  ngOnInit() {
    // determingin if in 'create' or 'edit' mode
    // executed whenever the url params change
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('todoId')) {
        // extract id and use, in edit mode
        this.mode = 'edit';
        this.todoId = paramMap.get('todoId');
        
        // start showing loading here
        this.isLoading = true;
        // this.todo = this.todosService.getTodo(this.todoId).subscribe();
        this.todosService.getTodo(this.todoId).subscribe(todoData => {
          // stop showing loading here
          this.isLoading = false;
          this.todo = {
            id: todoData._id,
            title: todoData.title,
            content: todoData.content  
          };
        })

      } else {
        this.mode = 'create';
        this.todoId = null;
      }
    });
  }
  
  onSaveTodo(form: NgForm) {
    if(form.invalid){
      return;
    }
    
    this.isLoading = true;
    if (this.mode == 'create') {
      this.todosService.addTodo(form.value.title, form.value.content);
    } else {
      this.todosService.updateTodo(
        this.todoId,
        form.value.title,
        form.value.content 
      );
    }

    form.resetForm();

  }
}
