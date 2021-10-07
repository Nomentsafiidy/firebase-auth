import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, HomePageRoutingModule, ReactiveFormsModule],
    declarations: [HomePage],
})
export class HomePageModule {}
