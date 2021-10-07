import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { VerifyYourEmailPage } from './verify-your-email.page';

const routes: Routes = [{ path: '', component: VerifyYourEmailPage }];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslateModule,
  ],
  declarations: [VerifyYourEmailPage],
  exports: [RouterModule],
})
export class VerifyYourEmailPageModule {}
