import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { AngularMaterialModule } from "../angular-material.module";
import { TodoCreateComponent } from "./todo-create/todo-create.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { OwlDateTimeModule } from "ng-pick-datetime";
import { OwlMomentDateTimeModule } from "ng-pick-datetime-moment";

@NgModule({
  declarations: [TodoCreateComponent, TodoListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule

  ]
})
export class TodosModule {}
