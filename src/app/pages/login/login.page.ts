import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { IdbService } from 'src/app/services/idb.service';
import { UserService } from 'src/app/services/user.service';

enum ErrorTypes {
    USER_NOT_FOUND,
    WRONG_PASSWORD,
    EMAIL_NOT_VERIFIED,
    NULL,
}
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public loginForm: FormGroup;
    public errorType: ErrorTypes = ErrorTypes.NULL;
    public errorTypes: typeof ErrorTypes = ErrorTypes;

    private errorCode = {
        userNotFound: 'auth/user-not-found',
        wrongPassword: 'auth/wrong-password',
    };

    public acces_error: boolean = false;
    public loading: boolean = false;
    public showPassword: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private idbService: IdbService,
        private router: Router
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    ngOnInit() {}

    public get f() {
        return this.loginForm.controls;
    }

    public onSignIn() {
        this.loading = true;
        this.errorType = this.errorTypes.NULL;
        const login: Login = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password,
        };
        this.authService
            .signIn(login)
            .then(async (res) => {
                if (res.user?.uid) {
                    if (res.user.emailVerified) {
                        const user: User = await this.userService.getById(res.user.uid);
                        await this.idbService.set('user', user);
                        this.router.navigate(['/']);
                    } else {
                        this.errorType = this.errorTypes.EMAIL_NOT_VERIFIED;
                    }
                } else this.errorType = this.errorTypes.USER_NOT_FOUND;
            })
            .catch((error: any) => {
                this.loading = false;
                if (error.code === this.errorCode.userNotFound) {
                    this.errorType = this.errorTypes.USER_NOT_FOUND;
                } else if (error.code === this.errorCode.wrongPassword) {
                    this.errorType = this.errorTypes.WRONG_PASSWORD;
                } else {
                    console.log(error);
                }
            })
            .finally(() => (this.loading = false));
    }
}
