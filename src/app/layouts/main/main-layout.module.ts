// Import Libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Import Own
import { MainLayout } from './main.layout';
import { MainLayoutRoutingModule } from './main-layout-routing';
import { HeaderComponentModule } from 'src/app/components/header/header.module';

@NgModule({
    imports: [CommonModule, FormsModule, MainLayoutRoutingModule, HeaderComponentModule],
    entryComponents: [MainLayout],
    declarations: [MainLayout],
})
export class MainLayoutModule {}
