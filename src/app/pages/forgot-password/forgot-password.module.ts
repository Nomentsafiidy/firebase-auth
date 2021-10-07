import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ForgotPasswordPage } from './forgot-password.page';

const routes: Routes = [{ path: '', component: ForgotPasswordPage }];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslateModule,
  ],
  declarations: [ForgotPasswordPage],
  exports: [RouterModule],
})
export class ForgotPasswordPageModule {}
