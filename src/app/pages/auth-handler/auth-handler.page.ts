import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/check-password';

enum ModeType {
    RESET_PASSWORD = 'resetPassword',
    VERIFY_EMAIL = 'verifyEmail',
}
@Component({
    selector: 'app-auth-handler',
    templateUrl: './auth-handler.page.html',
    styleUrls: ['./auth-handler.page.scss'],
})
export class AuthHandlerPage implements OnInit {
    public modeTypeActivated!: ModeType;
    public modeType: typeof ModeType = ModeType;

    public resetForm: FormGroup;
    public loading: boolean = false;
    public showPassword: boolean = false;
    public showConfirmPassword: boolean = false;
    private oobCode!: string;
    private mode!: string;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.resetForm = this.formBuilder.group(
            {
                password: ['', [Validators.required]],
                confirmPassword: ['', Validators.required],
            },
            {
                validator: MustMatch('password', 'confirmPassword'),
            }
        );
        this.activatedRoute.queryParamMap.subscribe((params) => {
            this.oobCode = params.get('oobCode') as string;
            this.mode = params.get('mode') as string;
            if (!this.oobCode || !this.mode) {
                this.router.navigate(['/login']);
            } else {
                switch (this.mode) {
                    case ModeType.RESET_PASSWORD:
                        this.modeTypeActivated = ModeType.RESET_PASSWORD;
                        break;
                    case ModeType.VERIFY_EMAIL:
                        this.loading = true;
                        this.modeTypeActivated = ModeType.VERIFY_EMAIL;
                        this.handleVerifyEmail();
                        break;
                    case 'recoverEmail':
                    // Display email recovery handler and UI.
                    // handleRecoverEmail(auth, actionCode, lang);
                    // to do
                    default:
                        // Error: invalid mode.
                        this.router.navigate(['/login']);
                }
            }
        });
    }

    ngOnInit(): void {}

    public get f() {
        return this.resetForm.controls;
    }

    public async handleVerifyEmail() {
        await this.authService.verifyEmail(this.oobCode);
        this.loading = false;
    }

    public onResetPassword() {
        const newPassword: string = this.resetForm.get('password')?.value;
        this.authService.resetPassword(this.oobCode, newPassword).then(() => {
            this.router.navigate(['login']);
        });
    }
}
