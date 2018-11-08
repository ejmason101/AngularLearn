import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoCreateComponent } from './todo/todo-create/todo-create.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';


/*
path '' -- localhost:3000/
*/
const routes: Routes = [
  { path: "", loadChildren: "./home/home.module#HomeModule", canActivate: [AuthGuard]
  },
  { path: "auth", loadChildren: "./auth/auth.module#AuthModule"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],   // so app.module.ts can use outside
  providers: [AuthGuard]
})
export class AppRoutingModule { }

/*
  {
    path: 'create', // localhost:4200/create
    component: TodoCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:todoId',
    component: TodoCreateComponent,
    canActivate: [AuthGuard]
  },*/
