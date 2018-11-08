import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "../angular-material.module";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AdminPanelRoutingModule } from "./admin-panel-routing.module";
import { AuthModule } from "../auth/auth.module";
import { NgModule } from "@angular/core";
import { AdminPanelComponent } from "./admin-panel.component";
import { NewsCreateComponent } from "./news-create/news-create.component";

@NgModule({
    declarations: [ AdminPanelComponent, NewsCreateComponent],
    imports: [CommonModule, AngularMaterialModule, FormsModule, FlexLayoutModule,
         AuthModule, AdminPanelRoutingModule]
})
export class AdminPanelModule {}