import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'auth';
    constructor(private translate: TranslateService) {
        this.initLanguage();
    }

    public initLanguage() {
        this.translate
            .use(navigator.language)
            .toPromise()
            .catch(() => this.translate.use('en'));
    }
}
