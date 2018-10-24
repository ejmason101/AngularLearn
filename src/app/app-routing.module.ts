import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoCreateComponent } from './todo/todo-create/todo-create.component';


/*
path '' -- localhost:3000/
*/
const routes: Routes = [
  { path: '',
    component:  TodoListComponent
  },
  {
    path: 'create', // localhost:4200/create
    component: TodoCreateComponent
  },
  {
    path: 'edit/:todoId',
    component: TodoCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]   // so app.module.ts can use outside
})
export class AppRoutingModule { }
