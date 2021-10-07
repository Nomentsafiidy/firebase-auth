import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IdbService } from 'src/app/services/idb.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    constructor(private authService: AuthService, private idbService: IdbService) {}

    ngOnInit(): void {}

    public async onLogOut() {
        await this.idbService.clear();
        this.authService.signOut();
    }
}
