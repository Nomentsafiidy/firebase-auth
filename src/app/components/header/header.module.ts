import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    imports: [CommonModule, RouterModule, TranslateModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
})
export class HeaderComponentModule {}
