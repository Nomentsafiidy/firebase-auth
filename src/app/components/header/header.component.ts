import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'auth-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public user!: User;

    constructor(private authService: AuthService, private userService: UserService) {}

    async ngOnInit(): Promise<void> {
        try {
            this.user = await this.userService.getById((await this.authService.getCurrentUser()).uid);
            console.log('this.user => ', this.user);
        } catch (error) {
            console.log('error =>', error);
        }
    }
}
