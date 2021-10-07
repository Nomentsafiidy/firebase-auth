import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from 'src/app/validators/check-password';

enum RegisterErrors {
    PSEUDO_ALREADY_TAKEN,
    EMAIl_ALREADY_IN_USE,
    NULL,
}
@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    public registerForm!: FormGroup;
    public loading: boolean = false;

    public registerError: RegisterErrors = RegisterErrors.NULL;
    public registerErrors: typeof RegisterErrors = RegisterErrors;

    public showPassword: boolean = false;
    public showConfirmPassword: boolean = false;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
        this.initForm();
    }

    ngOnInit(): void {}

    public get f() {
        return this.registerForm.controls;
    }

    private initForm() {
        this.registerForm = this.formBuilder.group(
            {
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                pseudo: ['', Validators.required],
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required],
            },
            {
                validator: MustMatch('password', 'confirmPassword'),
            }
        );
    }

    public async onRegister() {
        this.registerError = RegisterErrors.NULL;
        const user: User = {
            firstName: this.registerForm.get('firstName')?.value,
            lastName: this.registerForm.get('lastName')?.value,
            email: this.registerForm.get('email')?.value,
            pseudo: this.registerForm.get('pseudo')?.value,
            password: this.registerForm.get('password')?.value,
            dateCreate: Date.now(),
            dateUpdate: Date.now(),
            isFirstStart: true,
            isAdmin: false,
        };
        if (user.pseudo) {
            const pseudoAlreadyTaken: boolean = await this.authService.checkPseudo(user.pseudo);
            if (pseudoAlreadyTaken) {
                this.registerError = RegisterErrors.PSEUDO_ALREADY_TAKEN;
            } else {
                this.authService
                    .signUp(user)
                    .then(() => {
                        this.router.navigate(['/verify-your-email']);
                    })
                    .catch((err) => {
                        if (err.message) {
                            this.registerError = RegisterErrors.EMAIl_ALREADY_IN_USE;
                        } else {
                            console.log('err', err.message);
                        }
                    });
            }
        }
    }
}
