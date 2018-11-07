import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoCreateComponent } from './todo/todo-create/todo-create.component';
import { AuthGuard } from './auth/auth.guard';


/*
path '' -- localhost:3000/
*/
const routes: Routes = [
  { path: "",
    component:  TodoListComponent
  },
  {
    path: 'create', // localhost:4200/create
    component: TodoCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:todoId',
    component: TodoCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: "auth", loadChildren: "./auth/auth.module#AuthModule"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],   // so app.module.ts can use outside
  providers: [AuthGuard]
})
export class AppRoutingModule { }
