import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterPage } from './register.page';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [{ path: '', component: RegisterPage }];
@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes), TranslateModule, MatIconModule, MatButtonModule],
    declarations: [RegisterPage],
    exports: [RouterModule],
})
export class RegisterPageModule {}
