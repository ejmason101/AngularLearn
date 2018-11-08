import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { NewsView } from "./news-view/news-view.component";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "../angular-material.module";
import { FormsModule } from "@angular/forms";
import { TodayView } from "./today-view/today-view.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthModule } from "../auth/auth.module";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
    declarations: [ HomeComponent, NewsView, TodayView],
    imports: [CommonModule, AngularMaterialModule, FormsModule, FlexLayoutModule, AuthModule, HomeRoutingModule]
})
export class HomeModule {}