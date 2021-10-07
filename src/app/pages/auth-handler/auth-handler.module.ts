import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthHandlerPage } from './auth-handler.page';

const routes: Routes = [{ path: '', component: AuthHandlerPage }];
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes),
        TranslateModule,
        MatProgressBarModule,
        MatIconModule,
        MatButtonModule,
    ],
    declarations: [AuthHandlerPage],
    exports: [RouterModule],
})
export class AuthHandlerPageModule {}
